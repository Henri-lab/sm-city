const Notice = require('../models/Notice.cjs');

const getAllNotices = async (req, res) => {
    try {
        const results = await Notice.getAll();
        res.status(200).json({ status: 1, data: results });
    } catch (err) {
        res.status(500).json({ status: 0, err: err.message });
    }
};

const getNoticeById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Notice.getById(id);
        res.status(200).json({ status: 1, data: result });
    } catch (err) {
        res.status(500).json({ status: 0, err: err.message });
    }
};

const createNotice = async (req, res) => {
    const newNotice = req.body;
    try {
        const result = await Notice.create(newNotice);
        res.status(201).json({ status: 1, id: result.insertId, ...newNotice });
    } catch (err) {
        res.status(500).json({ status: 0, err: err.message });
    }
};

const updateNotice = async (req, res) => {
    const { id } = req.params;
    const updatedNotice = req.body;
    try {
        const result = await Notice.update(id, updatedNotice);
        res.json(result);
    } catch (err) {
        res.status(500).json({ status: 1, err: err.message });
    }
};

const deleteNotice = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Notice.delete(id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllNotices,
    getNoticeById,
    createNotice,
    updateNotice,
    deleteNotice
};
