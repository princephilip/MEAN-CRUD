const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Video = require('../models/video')

const db = "mongodb://userphilip:onyebuchi89!@ds125953.mlab.com:25953/videoplayer"
mongoose.Promise = global.Promise
mongoose.connect(db, { useNewUrlParser: true })


router.get('/videos', function (req, res) {
    console.log('Get request for all videos')
    Video.find({})
        .exec(function (err, videos) {
            if (err) {
                console.log("error retrieving videos")
            } else {
                res.json(videos)
            }
        })
})

router.get('/videos/:id', function (req, res) {
    console.log('Get request for a single video')
    Video.findById(req.params.id)
        .exec(function (err, videos) {
            if (err) {
                console.log("error retrieving videos")
            } else {
                res.json(videos)
            }
        })
})

router.post('/video', function (req, res) {
    console.log('post a video')
    var newVideo = new Video()
    newVideo.title = req.body.title
    newVideo.url = req.body.url
    newVideo.description = req.body.description
    newVideo.save(function (err, insertedVideo) {
        if (err) {
            console.log('Error saving video')
        } else {
            res.json(insertedVideo)
        }
    })
})

router.put('/video/:id', function (req, res) {
    console.log('update a video')
    Video.findByIdAndUpdate(
        req.params.id,
        {
            $set: { title: req.body.title, url: req.body.url, description: req.body.description }
        },
        {
            new: true
        },
        function (err, updatedVideo) {
            if (err) {
                res.send('Error updating video')
            } else {
                res.json(updatedVideo)
            }
        }
    )
})

router.delete('/video/:id', function (req, res) {
    console.log('video deleting')
    Video.findByIdAndRemove(
        req.params.id,
        function (err, deletedVideo) {
            if (err) {
                res.send('Error deleting video')
            } else {
                res.json(deletedVideo)
            }
        }
    )
})

module.exports = router