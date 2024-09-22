var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Ticket = require('./ticket.model');
var port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ticketmanagement')

// Middleware
app.use(bodyParser.json());

// Get all tickets
app.get('/tickets', async (req, res) => {
    try {
        let tickets = await Ticket.find({});
        res.status(200).json(tickets);
    } catch (error) {
        console.error("Error fetching tickets:", error);
        res.status(500).json({ error: 'Failed to fetch tickets' });
    }
});

// Get a ticket by ID
app.get('/tickets/:ticketId', async (req, res) => {
    const ticketId = req.params.ticketId;

    if (ticketId.length !== 24) {
        return res.status(400).json({ error: 'Invalid ticket ID' });
    }

    try {
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        res.status(200).json(ticket);
    } catch (error) {
        console.error('Error fetching ticket:', error);
        res.status(500).json({ error: 'Failed to fetch ticket' });
    }
});

// Create a new ticket
app.post('/addTickets', async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

    try {
        const newTicket = new Ticket({
            title,
            description,
            status: 'open'
        });
        const savedTicket = await newTicket.save();
        res.status(201).json(savedTicket);
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ error: 'Failed to create ticket' });
    }
});

// Update a ticket by ID
app.put('/tickets/:ticketId', async (req, res) => {
    const ticketId = req.params.ticketId;
    const { title, description, status } = req.body;

    if (ticketId.length !== 24) {
        return res.status(400).json({ error: 'Invalid ticket ID' });
    }

    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(
            ticketId,
            { title, description, status, updatedAt: Date.now() },
            { new: true }
        );

        if (!updatedTicket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        res.status(200).json(updatedTicket);
    } catch (error) {
        console.error('Error updating ticket:', error);
        res.status(500).json({ error: 'Failed to update ticket' });
    }
});

// Delete a ticket by ID
app.delete('/tickets/:ticketId', async (req, res) => {
    const ticketId = req.params.ticketId;

    if (ticketId.length !== 24) {
        return res.status(400).json({ error: 'Invalid ticket ID' });
    }

    try {
        const deletedTicket = await Ticket.findByIdAndDelete(ticketId);
        if (!deletedTicket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        console.error('Error deleting ticket:', error);
        res.status(500).json({ error: 'Failed to delete ticket' });
    }
});

// Start the server
app.listen(port, function() {
    console.log('App listening on port ' + port);
});
