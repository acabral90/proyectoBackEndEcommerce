import chai from "chai";
import supertest from "supertest";
import productModel from "../src/dao/models/products.js";
import userModel from "../src/dao/models/user.js";
import { app } from "../src/app.js";

const expect = chai.expect;
const requester = supertest(app);

describe('Testing de nuestra App', ()=>{

    describe('Test del router de sessions',()=>{
        beforeEach(async function(){
            this.timeout(30000);
        });   

        /*after(async function(){
            await userModel.deleteOne({email: 'darthvader@darkside.com'})
        });*/

        /*it('Registro de un usuario', async function(){
            this.timeout(30000)

            const userMock = {
                first_name: 'Anakin',
                last_name: 'Skywalker',
                email: 'darthvader@darkside.com',
                age: 35,
                password: 'starwars'
            }
        
            const result = await requester.post('/api/session/register').send(userMock)

            expect(result.statusCode).to.be.equal(200)
        });*/

        it('Se loguea el usuario y se verifica que el rol que se le asignó es "user"' , async function(){
            this.timeout(30000)

            const userMock = {
                email : 'darthvader@darkside.com',
                password : 'starwars'
            };

            //const user = JSON.parse(JSON.stringify(userMock));
            //console.log(user)

            const login = await requester.post('/api/session').send(userMock);
            const result = await requester.get('/api/session/current').send(userMock)
            console.log(result)
        })

    });

    describe('Test del router de products', ()=>{

        beforeEach(async function(){
            this.timeout(10000)
        })

        it('Endpoint que trae los productos', async function(){
            this.timeout(10000)
            const result = await requester.get('/api/products')
            const {statusCode,_body} = result;
            expect(statusCode).to.be.equal(200);
            expect(_body.status).to.be.equal("success");
        })
    });

})
