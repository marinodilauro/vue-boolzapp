const { createApp } = Vue;

createApp({
  data() {
    return {
      receivedMessage: null,
      activeContact: 0,
      searchBarInput: '',
      newMessage: {
        date: `${luxon.DateTime.now().toLocaleString(luxon.DateTime.DATE_SHORT)} ${luxon.DateTime.now().toLocaleString(luxon.DateTime.TIME_24_SIMPLE)}`,
        message: '',
        status: 'sent'
      },

      // Contacts list
      contacts: [
        {
          name: 'Michele',
          avatar: './assets/img/avatar_1.jpg',
          visible: true,
          messages: [
            {
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
          avatar: './assets/img/avatar_2.jpg',
          visible: true,
          messages: [
            {
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
          avatar: './assets/img/avatar_3.jpg',
          visible: true,
          messages: [
            {
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
          avatar: './assets/img/avatar_4.jpg',
          visible: true,
          messages: [
            {
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
          avatar: './assets/img/avatar_5.jpg',
          visible: true,
          messages: [
            {
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
          avatar: './assets/img/avatar_6.jpg',
          visible: true,
          messages: [
            {
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
          avatar: './assets/img/avatar_7.jpg',
          visible: true,
          messages: [
            {
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
          avatar: './assets/img/avatar_8.jpg',
          visible: true,
          messages: [
            {
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
      ]

    }
  },
  methods: {

    /** Function that show only hours and minutes in messages time
     * 
     * The function takes the message date and time (in hh:mm:ss) and split this value in two values,
     * changing the time format in hh:mm and splitting again in two values, hours and minutes.
     * Then creates a varaible for the hours and assign the first value.
     * Then creates another varaible for the mionutes and assign the second value.
     * The function return a template literal with the two variables separated by a ':'.
     * 
     * @param {number} activeContactIndex The index of the contact you are chatting with
     */
    messageTimeWithoutSeconds(activeContactIndex) {

      const messageHour = this.contacts[activeContactIndex].messages.at(-1).date.split(' ').slice(1, 2)[0].split(':')[0];
      const messageMinute = this.contacts[activeContactIndex].messages.at(-1).date.split(' ').slice(1, 2)[0].split(':')[1];

      const messageNewTime = `${messageHour}:${messageMinute}`;

      return messageNewTime;

    },

    /** Function to search in contacts list
     * 
     * The function first checks the first character the user enters in the search bar and shows only the contacts whose name begins with that letter.
     * Then if the user adds another character in the input field the function returns all contacts whose name has the characters entered by the user as first and second letters.
     * The function continues with all the characters entered by the user.
     * If the user does not enter any characters in the input field the function shows all contacts in the list.
     */
    searchContact() {

      let contactslist;

      if (!this.searchBarInput.length) {

        contactslist = this.contacts;

      } else if (this.searchBarInput.length === 1) {

        contactslist = this.contacts.filter(contact => contact.name[0].toLowerCase().includes(this.searchBarInput.toLowerCase()));

      } else if (this.searchBarInput.length >= 2) {

        contactslist = this.contacts.filter(contact => contact.name.toLowerCase().includes(this.searchBarInput.toLowerCase()))

      };

      return contactslist;

    },

    /** Function to write messages
     * 
     * The function takes the message written by the user and pushes it in the array of messages with the contact the user is chatting with.
     * Then clears the input.
     * 
     * @param {number} activeContactIndex The index of the contact you are chatting with
     */
    addMessage(activeContactIndex) {

      this.contacts[activeContactIndex].messages.push(this.newMessage);

      this.newMessage = { ...this.newMessage, message: '' };

    },

    /** Function to receive a placeholder reply message
     * 
     * The function send a placeholder reply message in the chat of the contact the user is chatting with.
     * 
     * @param {number} activeContactIndex The index of the contact you are chatting with
     */
    replyMessage(activeContactIndex) {

      setTimeout(() => {

        console.log(this.newMessage);
        receivedMessage = { ...this.newMessage, message: 'OK', status: 'received' };
        console.log(receivedMessage);
        console.log(this.contacts[0].messages);
        this.contacts[activeContactIndex].messages.push(receivedMessage);
        console.log(this.contacts[activeContactIndex].messages);

      }, 1000, activeContactIndex)
    }

  },
  mounted() {

  }
}).mount('#app')