//Carico l'istanza di Vue
var app = new Vue({
    el: '#root',
    data: {
        profile: {
            name: 'Sofia',
            avatar: '_io',
        },
        contacts: [{
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [{
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [{
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro B.',
                avatar: '_4',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro L.',
                avatar: '_5',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Claudia',
                avatar: '_6',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Federico',
                avatar: '_7',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Davide',
                avatar: '_8',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }
        ],
        //Variabile indice
        indexChanged: 0,
        //Variabile messaggio digitato
        myMessage: '',
        search: '',
        actualMessage: '',
        condition: false,
    },
    methods: {
        //Funzione per cambiare chat al click
        showContactsIndex: function(index){           
            this.indexChanged = index;
            condition = true;
        },
        //Funzione per l'invio di un messaggio e ricezione risposta automatica dopo 1 secondo
        sendMessage: function(index){ 
            this.contacts[index].messages.push({
                date: dayjs().format('DD/MM/YY HH:MM:ss'),
                message: this.myMessage,
                status: 'sent',
            }),
            this.myMessage = '';
            setTimeout(() =>{
                this.contacts[index].messages.push(
                    {
                        date: dayjs().format('DD/MM/YY HH:MM:ss'),
                        message: 'ok',
                        status: 'received'
                    }
                )
            }, 1000
            )
        },
        //Funzione per visualizzare ultimo messaggio nella lista delle chat
        showLastMessage: function(index){
            if (this.contacts[index].messages.length == 0){
                return '';
            } else {
            return this.contacts[index].messages[this.contacts[index].messages.length - 1].message;
            }  
        },
        //Funzione per visualizzare la data dell'ultimo messaggio nella lista delle chat
        showLastDateMessage: function(index){
            if (this.contacts[index].messages.length == 0){
                return '';
            } else {
            return this.contacts[index].messages[this.contacts[index].messages.length - 1].date;
            }
        },
        //Funzione per eliminare un messaggio
        deleteMessage: function(index){
            this.actualMessage = index;
            this.contacts[this.indexChanged].messages.splice(index, 1);
        },
    },
    //Utilizzando il computed funziona
    computed: {
        searchChat : function(){
            return this.contacts.filter(element => {
                if(element.name.toLowerCase().includes(this.search.toLowerCase())){
                    return element.name;
                }         
            })
        },
    }, 
})