var express = require('express');
var router = express.Router();
var resume_dal = require('../dal/resume_dal');

/* Get users listing. */
router.get('/all', function(req, res, next){
    resume_dal.getAll(function(err, result){
        if (err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('resume/resume_view_all', {resumes: result});
        }
    })
});

router.get('/add', function(req, res){
    res.render('resume/resume_add');
});

router.get('/insert', function(req, res){
    resume_dal.insert(req.query, function(err,result){
        if(err){
            console.log(err);
            res.send(err);
        } else {
            res.redirect(302, '/resume/all');
        }
    });
});

router.get('/edit', function(req, res){
    resume_dal.getinfo(req.query.resume_id, function(err, result){
        if(err){ res.send(err); }
        else{
            res.render('resume/ResumeUpdate',
                {resume:result[0][0]}
            );
        }
    });
});

router.get('/update', function(req, res){
    resume_dal.update(req.query, function(err, result){
        if(err){
            res.send(err);
        }else{
            res.redirect(302, '/resume/all');
        }
    });
});


router.get('/delete', function(req, res){
    resume_dal.delete(req.query, function(err, result){
        if(err){
            res.send(err);
        } else {res.redirect(302, '/resume/all');
        }
    });
});

module.exports = router;