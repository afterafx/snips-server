const Snippet = require('../models/Snippet.model');
const ErrorWithHttpStatus = require('../utils/error.httpStatus.utils');

exports.createSnippet = async (req, res, next) => {
  try {
    const snippet = await Snippet.insert(req.body);
    return res.status(201).send(snippet);
  } catch (error) {
    next(error);
  }
};

exports.getAllSnippets = async ({ query }, res, next) => {
  try {
    const allSnippets = await Snippet.select(query);
    return res.send(allSnippets);
  } catch (error) {
    next(error);
  }
};

exports.getOneSnippet = async (req, res, next) => {
  try {
    const snippet = await Snippet.select({ id: req.params.id });
    if (snippet.length === 0) {
      throw new ErrorWithHttpStatus('ID doesnt not exist', 404);
    }
    return res.send(snippet[0]);
  } catch (error) {
    next(error);
  }
};

exports.updateSnippet = async (req, res, next) => {
  try {
    const snippet = await Snippet.update(req.params.id, req.body);
    res.send(snippet);
  } catch (error) {
    next(error);
  }
};

exports.deleteSnippet = async (req, res, next) => {
  try {
    const snippet = await Snippet.delete(req.params.id);
    res.send(snippet);
  } catch (error) {
    next(error);
  }
};
