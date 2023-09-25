import mongoose from 'mongoose';
import { config } from '../../config/env.js';


const database = {
    connect: () => {
        return mongoose.connect(
            `mongodb+srv://nachoIntegrador:${config.passwordMongoDb}@integradordallape.knrlzeo.mongodb.net/integradorDallape`,
            { useUnifiedTopology: true, useNewUrlParser: true }
        )
        .then(() => {
            console.log('Conexion exitosa a la base de datos');
        })
        .catch(err => console.log(err));
    }
};


export default database;




// Descomenta la siguiente parte para cargar usuarios en la base de datos
// (async () => {
//     try {
//         await UserModel.insertMany(users);
//         console.log('Inserted', users.length, 'users');
//     } catch (error) {
//         console.error('Error en insert many:', error);
//     }
// })();

// let users= [{"firstName":"Justino","lastName":"Fidgin","email":"jfidgin0@boston.com","gender":"Male","grade":6,"group":"1B"},
// {"firstName":"Ketty","lastName":"Robson","email":"krobson1@prlog.org","gender":"Female","grade":10,"group":"2A"},
// {"firstName":"Dierdre","lastName":"Barron","email":"dbarron2@dailymail.co.uk","gender":"Female","grade":9,"group":"1B"},
// {"firstName":"Nana","lastName":"Pellew","email":"npellew3@nytimes.com","gender":"Female","grade":6,"group":"1A"},
// {"firstName":"Shannan","lastName":"Preshous","email":"spreshous4@paginegialle.it","gender":"Male","grade":8,"group":"2B"},
// {"firstName":"Mark","lastName":"Yurchishin","email":"iyurchishin5@google.it","gender":"Male","grade":10,"group":"2B"},
// {"firstName":"Tannie","lastName":"Takkos","email":"ttakkos6@mtv.com","gender":"Female","grade":7,"group":"2B"},
// {"firstName":"Debbi","lastName":"Eddowis","email":"deddowis7@jigsy.com","gender":"Female","grade":6,"group":"1B"},
// {"firstName":"Dugald","lastName":"Toun","email":"dtoun8@java.com","gender":"Male","grade":4,"group":"1A"},
// {"firstName":"Lorain","lastName":"Judkin","email":"ljudkin9@bigcartel.com","gender":"Genderqueer","grade":8,"group":"2B"},
// {"firstName":"Shelley","lastName":"Crinion","email":"scriniona@wsj.com","gender":"Genderfluid","grade":8,"group":"2A"},
// {"firstName":"Kellyann","lastName":"Doel","email":"kdoelb@merriam-webster.com","gender":"Female","grade":8,"group":"1B"},
// {"firstName":"Romona","lastName":"Derricoat","email":"rderricoatc@vkontakte.ru","gender":"Female","grade":5,"group":"1A"},
// {"firstName":"Lorine","lastName":"McVaugh","email":"lmcvaughd@unc.edu","gender":"Female","grade":4,"group":"2A"},
// {"firstName":"Ker","lastName":"Chiese","email":"kchiesee@prlog.org","gender":"Male","grade":8,"group":"1A"},
// {"firstName":"Aloisia","lastName":"Hovie","email":"ahovief@simplemachines.org","gender":"Female","grade":8,"group":"2B"},
// {"firstName":"Marshall","lastName":"Chatten","email":"mchatteng@creativecommons.org","gender":"Male","grade":9,"group":"2B"},
// {"firstName":"Marcelo","lastName":"Rubega","email":"mrubegah@house.gov","gender":"Male","grade":6,"group":"1A"},
// {"firstName":"Yves","lastName":"Halsey","email":"yhalseyi@naver.com","gender":"Male","grade":5,"group":"2A"},
// {"firstName":"Corene","lastName":"Greed","email":"cgreedj@epa.gov","gender":"Female","grade":8,"group":"1A"}]