import chai from "chai";
import supertest from "supertest";
import productModel from "../src/dao/models/products.js";
import userModel from "../src/dao/models/user.js";
import { app } from "../src/app.js";
import ticketModel from "../src/dao/models/tickets.js";

const expect = chai.expect;
const requester = supertest(app);

describe('Testing de nuestra App', ()=>{

    after(async function(){
        await userModel.deleteOne({email: 'darthvader@darkside.com'});
        await productModel.deleteOne({title: 'Sable laser'});
    });

    describe('Test del router de sessions',()=>{

        it('Registro de un usuario', async function(){
            this.timeout(50000);

            const userMock = {
                first_name: 'Anakin',
                last_name: 'Skywalker',
                email: 'darthvader@darkside.com',
                age: 35,
                password: 'starwars',
                role: 'admin'
            };
        
            const result = await requester.post('/api/session/register').send(userMock);

            expect(result.statusCode).to.be.equal(200)
        });

        it('Se loguea el usuario y se verifica que el rol que se le asignó es "admin"' , async function(){
            this.timeout(30000);

            const userMock = {
                email : 'darthvader@darkside.com',
                password : 'starwars'
            };

            const login = await requester.post('/api/session').send(userMock);
            const {statusCode, _body, headers} = login;
            expect(statusCode).to.be.equal(200);
            expect(_body.status).to.be.equal("success");
            
            const result = await requester.get('/api/session/current').set("Cookie",headers['set-cookie']);
            const {statusCode:_statusCode, _body: body} = result;
            expect(body.payload.role).to.be.equal("admin");
        })
    });

    describe('Test del router de products', ()=>{

        beforeEach(async function(){
            this.timeout(40000);
        });  

        it('Endpoint que trae los productos', async function(){
            
            const result = await requester.get('/api/products')
            const {statusCode,_body} = result;
            expect(statusCode).to.be.equal(200);
            expect(_body.status).to.be.equal("success");
        })

        it('Se verifica que se cree un producto correctamente y que se cree el campo owner', async function(){

            const userMock = {
                email : 'darthvader@darkside.com',
                password : 'starwars'
            };

            const productMock = {
                title : 'Sable laser',
                description : 'Sable laser de cristal kyber',
                price : 750.000,
                stock : 1,
                category : 'Sables'
            }

            const login = await requester.post('/api/session').send(userMock);
            const {statusCode, _body, headers} = login;
            expect(statusCode).to.be.equal(200);
            expect(_body.status).to.be.equal("success");

            const result = await requester.post('/api/products').set("Cookie",headers['set-cookie']).send(productMock) 
            const {statusCode:_statusCode, _body: body} = result;
            
            expect(_statusCode).to.be.equal(200);
            expect(body.status).to.be.equal('success');
            expect(body.payload.owner).to.be.ok;
            
        })
    });

    describe('Test del router Carts', ()=>{

        it('Se verifica que el endpoint traiga el cart correspondiente al usuario', async function(){
            this.timeout(40000);

            const userMock = {
                email : 'darthvader@darkside.com',
                password : 'starwars'
            };

            const login = await requester.post('/api/session').send(userMock);
            const {statusCode, _body, headers} = login;
            expect(statusCode).to.be.equal(200);
            expect(_body.status).to.be.equal("success");

            const cart = await requester.get('/api/carts/:cid').set("Cookie", headers['set-cookie']);
            const {statusCode:_statusCode, _body: body} = cart;
            expect(_statusCode).to.be.equal(200);
            expect(body.status).to.be.equal('success');
            expect(body.respuesta._id).to.be.equal(_body.payload.cart[0]._id)
            
        });
    });    
});
