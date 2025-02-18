const { MongoClient } = require('mongodb');
const Contact = require('../models/Contact');
const { getContactSubmissions, submitContactForm } = require('../controllers/contactController');

describe('Contact API Tests', () => {
  let connection;
  let db;
  let contactCollection;

  beforeAll(async () => {
    // Setup in-memory MongoDB
    connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(globalThis.__MONGO_DB_NAME__);
    contactCollection = db.collection('contacts');
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    // Clear the collection before each test
    await contactCollection.deleteMany({});
  });

  describe('getContactSubmissions', () => {
    it('should retrieve all contact submissions sorted by date', async () => {
      // Arrange
      const mockContacts = [
        { name: 'Alice', email: 'alice@example.com', message: 'Hello', date: new Date('2023-01-01') },
        { name: 'Bob', email: 'bob@example.com', message: 'Hi', date: new Date('2023-01-02') }
      ];
      await contactCollection.insertMany(mockContacts);

      // Mock request and response objects
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Act
      await getContactSubmissions(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Contact submissions retrieved successfully.',
        data: expect.arrayContaining([
          expect.objectContaining({ name: 'Bob' }),
          expect.objectContaining({ name: 'Alice' })
        ])
      });
    });

    it('should handle database errors', async () => {
      // Arrange
      jest.spyOn(Contact, 'find').mockImplementationOnce(() => {
        throw new Error('Database error');
      });

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Act
      await getContactSubmissions(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'An error occurred while retrieving contact submissions.'
      });
    });
  });

  describe('submitContactForm', () => {
    it('should successfully submit a valid contact form', async () => {
      // Arrange
      const req = {
        body: {
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Hello, this is a test message.'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Act
      await submitContactForm(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Contact form submitted successfully!',
        data: { id: expect.any(String) }
      });

      // Verify database entry
      const savedContact = await contactCollection.findOne({ email: 'john@example.com' });
      expect(savedContact).toMatchObject({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello, this is a test message.'
      });
    });

    it('should return validation errors for invalid input', async () => {
      // Arrange
      const testCases = [
        {
          input: { name: 'Jo', email: 'john@example.com', message: 'Hi' }, // Name too short
          expectedErrors: ['Name must be at least 3 characters.']
        },
        {
          input: { name: 'John Doe', email: 'invalid-email', message: 'Hello' }, // Invalid email
          expectedErrors: ['Please provide a valid email address.']
        },
        {
          input: { name: 'John Doe', email: 'john@example.com', message: 'Hi' }, // Message too short
          expectedErrors: ['Message must be at least 10 characters.']
        },
        {
          input: { name: '', email: '', message: '' }, // Missing required fields
          expectedErrors: [
            'Name is required.',
            'Email is required.',
            'Message is required.'
          ]
        }
      ];

      for (const testCase of testCases) {
        const req = { body: testCase.input };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };

        // Act
        await submitContactForm(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
          success: false,
          message: 'Validation error.',
          details: expect.arrayContaining(testCase.expectedErrors)
        });
      }
    });

    it('should handle database errors during submission', async () => {
      // Arrange
      jest.spyOn(Contact.prototype, 'save').mockImplementationOnce(() => {
        throw new Error('Database error');
      });

      const req = {
        body: {
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Hello, this is a test message.'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Act
      await submitContactForm(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Internal server error. Please try again later.'
      });
    });

    it('should sanitize input data', async () => {
      // Arrange
      const req = {
        body: {
          name: 'John Doe',
          email: 'JOHN@EXAMPLE.COM',
          message: '<script>alert("XSS")</script>'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Act
      await submitContactForm(req, res);

      // Assert
      const savedContact = await contactCollection.findOne({ email: 'john@example.com' });
      expect(savedContact.email).toBe('john@example.com'); // Normalized email
      expect(savedContact.message).toBe('<script>alert("XSS")</script>'); // Escaped HTML
    });
  });
});
