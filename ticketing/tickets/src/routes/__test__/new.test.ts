import request from 'supertest'
import { app } from '../../app'

it('has a route handler listening to /api/tickets for post request', async () => {
    const response = await request(app)
       .post('/api/tickets')
       .send({});
    expect(response.status).toEqual(404)
    
    
})
it('It can only be accessed if the user is signed in',()=>{
	
})
it('returns an error if an invalid title is provided',()=>{
	
})
it('creates a ticket with invalid parameters',()=>{
	
})
it('has a route handler listening to /api/tickets for post request',()=>{
	
})