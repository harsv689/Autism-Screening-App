// const mongoose = require('mongoose');

// // Chatbot Schema
// const chatbotSchema = new mongoose.Schema({
//   chatbotName: {
//     type: String,
//     required: true,
//   },
//   tests: [
//     {
//       testName: {
//         type: String,
//         required: true,
//       },
//       questions: [
//         {
//           text: {
//             type: String,
//             required: true,
//           },
//           isUser: {
//             type: Boolean,
//             required: true,
//           },
//         },
//       ],
//     },
//   ],
// });

// module.exports = mongoose.model('Chatbot', chatbotSchema);


const mongoose = require('mongoose');

// Schema for storing chatbot interactions
const chatbotInteractionSchema = new mongoose.Schema({
    screeningId: {
        type: String,
        required: true,
        ref: 'Screening'
    },
    promptId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatbotSettings',
        required: true
    },
    responses: [{
        text: {
            type: String,
            required: false
        },
        audioUrl: {
            type: String,
            required: false
        },
        videoUrl: {
            type: String,
            required: false
        },
        userResponse: {
            type: String,
            required: false
        },
        timestamp: {
            type: Date,
            default: Date.now
        },
        mediaType: {
            type: String,
            enum: ['text', 'audio', 'video', 'mixed'],
            required: true
        },
        responseOrder: {
            type: Number,
            required: true
        }
    }],
    timestamp: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    }
});

// Schema for storing chatbot settings and prompt presets
const chatbotSettingsSchema = new mongoose.Schema({
    testId: {
        type: String,
        required: true, // Every chatbot settings document must have a test ID
        unique: true // Ensures each test ID is unique
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
    prompts: [{
        order: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            enum: ['head', 'body', 'movement'],
            required: true
        },
        promptText: {
            type: String,
            required: true
        },
        requiredMediaType: {
            type: String,
            enum: ['text', 'audio', 'video', 'mixed', 'none'],
            default: 'text'
        },
        conditions: {
            type: Map,
            of: String,
            default: {}
        },
        expectedResponseType: {
            type: String,
            enum: ['text', 'audio', 'video', 'mixed', 'none'],
            default: 'text'
        },
        maxResponses: {
            type: Number,
            default: 1 // Maximum number of responses allowed for this prompt
        },
        timeout: {
            type: Number,
            default: 60
        },
        isRequired: {
            type: Boolean,
            default: true
        }
    }],
    createdBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Pre-save middleware to ensure only one active preset
chatbotSettingsSchema.pre('save', async function (next) {
    const ChatbotSettings = mongoose.model('ChatbotSettings');
    
    // If this document is being set as active
    // if (this.isActive) {
    //     // Deactivate all other active presets
    //     await ChatbotSettings.updateMany(
    //         { isActive: true, _id: { $ne: this._id } }, // Exclude current document
    //         // { $set: { isActive: false } }
    //     );
    // }

    next();
});

// Pre-save middleware to auto-generate testId
chatbotSettingsSchema.pre('save', async function (next) {
    if (!this.testId) {
        const lastTest = await mongoose.model('ChatbotSettings').findOne().sort({ createdAt: -1 });
        const nextTestNumber = lastTest ? parseInt(lastTest.testId.replace('test', '')) + 1 : 1;
        this.testId = `test${nextTestNumber}`;
    }
    next();
});

// Create indexes
chatbotInteractionSchema.index({ screeningId: 1 });
chatbotInteractionSchema.index({ timestamp: 1 });
chatbotSettingsSchema.index({ name: 1 }, { unique: true });
chatbotSettingsSchema.index({ 'prompts.category': 1 });

const ChatbotInteraction = mongoose.model('ChatbotInteraction', chatbotInteractionSchema);
const ChatbotSettings = mongoose.model('ChatbotSettings', chatbotSettingsSchema);

module.exports = {
    ChatbotInteraction,
    ChatbotSettings
};