const mongoose = require('mongoose');
// const Chatbot = require('.././models/Chatbot'); // Adjust path based on your folder structure
const { ChatbotInteraction, ChatbotSettings } = require('../models/Chatbot');



const addInitialPreset = async () => {
    try {
        // Check if any presets exist
        const existingPresets = await ChatbotSettings.countDocuments();
        if (existingPresets > 0) {
            console.log('Presets already exist in the database.');
            return;
        }

        // Get the next testId
        const lastTest = await ChatbotSettings.findOne().sort({ createdAt: -1 });
        const nextTestNumber = lastTest ? parseInt(lastTest.testId.replace('test', '')) + 1 : 1;
        const testId = `test${nextTestNumber}`;

        // Create the initial preset
        const initialPreset = new ChatbotSettings({
            testId, // Set testId explicitly
            name: 'Initial Gait Analysis Bot',
            description: 'Analyze walking patterns for autism screening.',
            isActive: true,
            prompts: [
                {
                    order: 1,
                    category: 'movement',
                    promptText: 'Please upload a video of walking in a straight line.',
                    requiredMediaType: 'video',
                    expectedResponseType: 'video',
                    isRequired: true,
                },
                {
                    order: 2,
                    category: 'head',
                    promptText: 'What is the participant’s name?',
                    requiredMediaType: 'text',
                    expectedResponseType: 'text',
                    isRequired: true,
                },
                {
                    order: 3,
                    category: 'body',
                    promptText: 'What is the participant’s age and sex?',
                    requiredMediaType: 'text',
                    expectedResponseType: 'text',
                    isRequired: true,
                }
            ],
            createdBy: 'system',
        });

        // Save to database
        await initialPreset.save();
        console.log('Initial preset added successfully.');
    } catch (err) {
        console.error('Error adding initial preset:', err);
    }
};



const newPreset = new ChatbotSettings({
    name: "Medical Screening Preset",
    description: "Comprehensive medical screening questionnaire",
    isActive: true,
    createdBy: "admin",
    prompts: [
        {
            order: 1,
            category: "head",
            promptText: "Any headaches or dizziness?",
            requiredMediaType: "text",
            expectedResponseType: "text",
            maxResponses: 1,
            isRequired: true
        },
        {
            order: 2,
            category: "body",
            promptText: "Show any areas of pain",
            requiredMediaType: "video",
            expectedResponseType: "video",
            maxResponses: 3,
            timeout: 120
        },
        {
            order: 3,
            category: "movement",
            promptText: "Demonstrate range of motion",
            requiredMediaType: "video",
            expectedResponseType: "video",
            maxResponses: 5,
            timeout: 180
        }
    ]
});

const getSettingsByTestId = async (req, res) => {
    try {
        const { testId } = req.params;

        // Find chatbot settings by testId
        const settings = await ChatbotSettings.findOne({ testId });
        if (!settings) {
            return res.status(404).json({ message: 'Settings not found for the given testId' });
        }

        res.status(200).json(settings);
    } catch (err) {
        console.error('Error fetching settings by testId:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


async function createChatbotInteraction(req, res) {
    try {
        // Extract data from the request body
        const { screeningId, promptId, responses = [], status = 'pending' } = req.body;

        // Validate if the screeningId and promptId are valid
        const prompt = await ChatbotSettings.findById(promptId);
        if (!prompt) {
            return res.status(400).json({ error: 'Invalid prompt ID' });
        }

        // Prepare the new chatbot interaction
        const newInteraction = new ChatbotInteraction({
            screeningId,
            promptId,
            responses: responses.map((response, index) => ({
                text: response.text || null,
                audioUrl: response.audioUrl || null,
                videoUrl: response.videoUrl || null,
                userResponse: response.userResponse || null,
                timestamp: response.timestamp || Date.now(),
                mediaType: response.mediaType,
                responseOrder: index + 1, // Ordering responses starting from 1
            })),
            status,
            timestamp: Date.now(),
        });

        // Save the new interaction to the database
        await newInteraction.save();

        // Respond with the created interaction
        res.status(201).json({ message: 'Chatbot interaction created successfully', interaction: newInteraction });
    } catch (error) {
        console.error('Error creating chatbot interaction:', error);
        res.status(500).json({ error: 'Error creating chatbot interaction' });
    }
}
async function updateChatbotInteraction(req, res) {
    try {
        // Extract the interaction ID and data from the request body
        const interactionId = req.params.id;
        const {  responses = [], status } = req.body;

        console.log(req.body);

        // Find the chatbot interaction by its ID
        const interaction = await ChatbotInteraction.findById(interactionId);
        if (!interaction) {
            return res.status(404).json({ error: 'Chatbot interaction not found' });
        }

        // Update the responses and status if provided
        if (responses.length > 0) {
            interaction.responses = responses.map((response, index) => ({
                text: response.text || null,
                audioUrl: response.audioUrl || null,
                videoUrl: response.videoUrl || null,
                userResponse: response.userResponse || null,
                timestamp: response.timestamp || Date.now(),
                mediaType: response.mediaType,
                responseOrder: index + 1, // Ensure ordering of responses
            }));
        }

        if (status) {
            interaction.status = status; // Update status if provided
        }

        // Save the updated interaction to the database
        await interaction.save();

        // Respond with the updated interaction
        res.status(200).json({ message: 'Chatbot interaction updated successfully', interaction });
    } catch (error) {
        console.error('Error updating chatbot interaction:', error);
        res.status(500).json({ error: 'Error updating chatbot interaction' });
    }
}

module.exports = { addInitialPreset, newPreset, getSettingsByTestId, createChatbotInteraction, updateChatbotInteraction };

// module.exports = { addInitialPreset, newPreset, getSettingsByTestId, createChatbotInteraction };

// Function to add the chatbot
// const createChatbot = async () => {
//   try {
//     const newChatbot = new Chatbot({
//       chatbotName: 'Screening Assistant',
//       tests: [
//         {
//           testName: 'Test 1: General Screening',
//           questions: [
//             { text: "Hello, are you ready to begin the test?", isUser: false },
//             { text: "Can you confirm the participant information? (Name, Age, and Sex)", isUser: false },
//             { text: "Please upload a video of the participant walking in a straight path for analysis.", isUser: false },
//             { text: "Have you noticed any recent changes in the participant's walking pattern?", isUser: false },
//             { text: "Would you like to provide additional comments or observations?", isUser: false },
//           ],
//         },
//         {
//           testName: 'Test 2: Physical Activity Assessment',
//           questions: [
//             { text: "Hello, are you ready to begin the test?", isUser: false },
//             { text: "Can you confirm the participant information? (Name, Age, and Sex)", isUser: false },
//             { text: "Please upload a video of the participant walking in a straight path for analysis.", isUser: false },
//             { text: "Have you noticed any recent changes in the participant's walking pattern?", isUser: false },
//             { text: "Would you like to provide additional comments or observations?", isUser: false },
//           ],
//         },
//         {
//           testName: 'Test 3: Mental Health Assessment',
//           questions: [
//             { text: "Hello, are you ready to begin the test?", isUser: false },
//             { text: "Can you confirm the participant information? (Name, Age, and Sex)", isUser: false },
//             { text: "Please upload a video of the participant walking in a straight path for analysis.", isUser: false },
//             { text: "Have you noticed any recent changes in the participant's walking pattern?", isUser: false },
//             { text: "Would you like to provide additional comments or observations?", isUser: false },
//           ],
//         },
//       ],
//     });

//     const savedChatbot = await newChatbot.save();
//     console.log('Chatbot created successfully:', savedChatbot);
//     process.exit(); // Close the connection once the data is saved
//   } catch (error) {
//     console.error('Error creating chatbot:', error.message);
//     process.exit(1);
//   }
// };
