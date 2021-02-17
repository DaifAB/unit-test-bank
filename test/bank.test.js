require('dotenv').config()
const app = require('../server.js') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)
const mongoose = require('mongoose')


beforeAll(async () => {
  const url = process.env.DATABASE_URL
  await mongoose.connect(url, { useNewUrlParser: true })
})

// it('cin test (H) or (HH)', async done => {
//     const res = await request.get('/owners')
//       .then(res => {
//         const body = res.body
//         for (let index = 0; index < body.length; index++) {
//           expect(body[index].cin).toMatch(/^(H|HH)/)
          
//         }
//       })
//     done()
//   })

// it('phone test (+212)', async done => {
//     const res = await request.get('/owners')
//       .then(res => {
//         const body = res.body
//         for (let index = 0; index < body.length; index++) {
//           expect(body[index].phone).toMatch(/^(\+212)/)
          
//         }
//       })
//     done()
//   })
// it('user have a cc ', async done => {
//   const owner_id = "602d0e79e5366c2088d5ecac"
  
//     const res = await request.get('/creditcards/test/a')
//       .then(res => {
//         const body = res.body
//         var i = 0
//         for (let index = 0; index < body.length; index++) {
//          if(body[index].ccdeatails[0].owner_id == owner_id )
//             i++
//         }
//         expect(i).toBe(1)
//       })
//     done()
//   })
// it('all users in the same city (Safi) ', async done => {
//   const agency_id = "602d0ed6e53b7c2088d5ecad"
  
//     const res = await request.get('/accounts')
//       .then(res => {
//         const body = res.body
       
//         for (let index = 0; index < body.length; index++) {
          
//           expect(body[index].agency_id).toEqual(agency_id)
//         }
       
//       })
//     done()
//   })

// it('Should save owner to database', async done => {
//     const res = await request.post('/owners')
//       .send({
//         first_name : "test",
//         phone: "test",
//         cin : "test"
//       })
//     done()
//   })

// it('Should update owner from database', async done => {
//     const res = await request.patch('/owners/id')
//       .send({

//         first_name : "test3",
//         phone: "test",
//         cin : "test"
//       })
//     done()
//   })

// it('Should delete owner from database', async done => {
//     const res = await request.delete('/owners/602aab675455af41ec125bf2')
     
//     done()
//   })

//---------------------------------------Credit card test--------------------------------

// it('correct pin (length to be 4)', async done => {
//       const res = await request.get('/creditcards/602d124293da38341004f2c5')
//         .then(res => {
//           const body = res.body
          
//             expect(body.pin.toString().length).toBe(4)
            
          
//         })
//       done()
//     })

//-------------------------------------- GAB test ---------------------------------------------
// it('check if gab have money', async done => {
//       const res = await request.get('/upload/602d2975d8868b3d98e12ed3')
//         .then(res => {
//           const body = res.body
          
//             expect(body.total_up).not.toBe(0)
            
          
//         })
//       done()
//     })





// -------------------------------------------------  Uploads tests
// it('check if money requested exist in gab ', async done => {

//       const res = await request.get('/upload/getUploads/joinGab')
//         .then(res => {
//           const body = res.body

//           for (let index = 0; index < body.length; index++) {
//             expect(body[index].total_up).toBeGreaterThan(body[index].gab[0].money_requested);

//           }
//         })
//       done()
//     })

// it('Should save credit card to database', async done => {
//     const res = await request.post('/creditcards')
//       .send({
//         account_id : "test",
//         pin: "0000",
//         type : "test"
//       })
//     done()
//   })

// it('Should save Gab operation to database', async done => {
//     const res = await request.post('/gab')
//       .send({
//         creditCard_id : "test",
//         money_requested: 0
//       })
//     done()
//   })

// it('Should save Provider to database', async done => {
//     const res = await request.post('/money')
//       .send({
//         matricule : "test"
//       })
//     done()
//   })

// // clear database after tests
// afterEach(async () => {
//     await owners.deleteMany()
//   })