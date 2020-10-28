 const {Router} = require('express')
 const router = Router()
 const auth = require('../middlewears/auth.middlewear')
 const Map = require('../models/Maps')
 const config = require('config')
 const nodemailer = require('nodemailer')
 const User = require('../models/user')
 const db = require('mongoose')


router.get('/map',auth,async(req,res)=>
{
     try
     {
         const MapsMyMarks = await Map.find({ owner:  req.user.userId })
         const MapsanotherMarks = await Map.find({ owner:  {$ne: req.user.userId} })
         let saveNew = {
            marks : new Object(),
            owner : new Object()
        }
         MapsanotherMarks.map((e)=>
         {
            MapsMyMarks.push(e)
         })
        const usersfind = await User.find({})
       saveNew.marks = MapsMyMarks
       saveNew.owner = usersfind
       return  await res.json(saveNew)
     }
     catch(e)
     {
         res.status(500).send.json({message:'Что то пошло не так попробуйте снова!'})
     }
 })

 router.post('/create',auth,async(req,res) =>
 {
     try
     {
         console.log(req.body)
         const mapx = req.body.coordsX
         const mapy = req.body.coordsY
         const City = req.body.city
         const Link = req.body.link
         const Describe = req.body.describe
        

                if(mapx === ''|| mapy=== '')
        {
            return   res.status(500).json({message:'Пожайлуста выберете точку на карте!!'})
        }
        if(City === '')
        {
            return   res.status(500).json({message:'Пожайлуста введите название города вашей точке!!'})
        }

         if(Link === '')
         {
          return   res.status(500).json({message:'Пожайлуста введите ссылку  вашей точке!!'})
         }

        if(Describe === '')
        {
         return   res.status(500).json({message:'Пожайлуста введите описание к вашей точке!!'})
        }

         const Base = new Map({
            mapX:mapx,mapY: mapy, owner: req.user.userId, city:City,link:Link,describe:Describe,status: false
         })

          await Base.save()
          const resultquere = await User.findOne({"_id":req.user.userId})
          console.log(resultquere.email)


                           //Отправка email
                           let transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth:
                            {
                                user:config.get('Email'),
                                pass: config.get('EmailPassword')
                            }
                          })
                
                          let Options ={
                            from: config.get('Email'),
                            to: config.get('Email'),
                            subject: 'Message from trash found',
                            html: `Была добавлена новая точка на карте,<br> с координатами(<${mapx},${mapy}>),<br> с картинкой <a href = ${Link}>Кртинка</a>,<br><strong> от пользователя (${resultquere.email})</strong> `
                            // html: 'This <i>message</i> was sent from <strong>Node js</strong> server.'
                          }
                          console.log(Options)
        
                           transporter.sendMail(Options,function(error,info)
                          {
                              if(error)
                              {
                                  console.log(error)
                              }
                              else 
                              {
                                  console.log(info)
                              }
                          })
                          
                         //=====Отправка emeil=========

      return   res.status(201).json({ Base })
     }
     catch(e)
     {
         res.status(500).json({message:'Что то пошло не так попробуйте снова!'})
     }
 })



 router.post('/delete',auth,async(req,res)=>
 {
     const deleteObj = await Map.deleteOne({_id: req.body._id})
     const MapsMyMarks = await Map.find({ owner:  req.user.userId })
     const MapsanotherMarks = await Map.find({ owner:  {$ne: req.user.userId} })
     let saveNew = {
        marks : new Object(),
        owner : new Object()
    }
     MapsanotherMarks.map((e)=>
     {
        MapsMyMarks.push(e)
     })
    const usersfind = await User.find({})
   saveNew.marks = MapsMyMarks
   saveNew.owner = usersfind
     await res.json(saveNew)
 })

 router.post('/update',auth,async(req,res)=>
 {
    console.log(req.body)
    return Map.updateOne({_id:req.body._id},{status:true})
 }
 )

 module.exports = router