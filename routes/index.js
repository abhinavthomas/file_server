var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var  File = require('../models/file');
var multer = require('multer')
var upload = multer({dest:'public/uploads/'})
// Get Homepage
router.get('/', function(req, res){
		File.find({deleted:false},function(err,files){
	if(err){
		next(err);
		return;
	}
	res.render('index', {
		files : files
		});
});
});

router.get('/home', ensureAuthenticated, function (req, res, next) {
	// var file = new File();
	// res.render('home',{
	// file: file,	
	// title: 'Home'
	// });
	res.render('home',{title:'Express'});
});

router.post('/home', upload.any(), ensureAuthenticated, function(req, res,next){
	var file = File();
	file.file=req.body.files;
	file.links=req.body.link;
	file.is_link=req.body.is_file;
	
	file.save(function(err,file){
		if(err){
			next(err);
			return;
	}

	req.flash('success_msg', 'Upload Finished');

	res.redirect('/');

	});
	// res.send(req.body);
	// res.send(req.files);

	
});


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;