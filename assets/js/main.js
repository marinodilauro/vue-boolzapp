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

    deleteMessage(messageIndex, contactIndex) {

      messagesList = this.searchContact()[contactIndex].messages;
      selectedMessage = this.searchContact()[contactIndex].messages[messageIndex];
      console.log(messageIndex, contactIndex);

      messagesList.splice(messageIndex, 1);

    },

    /** Function that show only hours and minutes in messages time
     * 
     * The function cycles though every message of every contact.
     * Takes the time format in "dd/mm/yy hh:mm:ss" and splits first in two again in two values, hours and minutes.
     * Creates two variables for hours and mninutes.
     * For each variable takes the message time format in "dd/mm/yy hh:mm:ss" and splits it in two parts.
     * During the assignment of the valus to the hours and minutes variables,
     * the function splits again the second part of the original date format,
     * assigning then the first part to the hour variables and the second part to the minute variable.
     * Then join the two parts in a thir variable for the new time format.
     * The function finally assign the new date to all the messages in the list.
     * This works also for the new messages written adn received.
     * 
     */
    messageTimeWithoutSeconds() {

      for (const contact in this.contacts) {
        if (Object.hasOwnProperty.call(this.contacts, contact)) {
          const element = this.contacts[contact];

          for (const property in element.messages) {
            let prop = element.messages[property];

            const messageHour = prop.date.split(' ').slice(1, 2)[0].split(':')[0];
            const messageMinute = prop.date.split(' ').slice(1, 2)[0].split(':')[1];

            const newTimeFormat = `${messageHour}:${messageMinute}`;

            prop.time = newTimeFormat;

          }

        };
      };

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

      const messageHour = this.newMessage.date.split(' ').slice(1, 2)[0].split(':')[0];

      const messageMinute = this.newMessage.date.split(' ').slice(1, 2)[0].split(':')[1];

      const newTimeFormat = `${messageHour}:${messageMinute}`;

      this.newMessage = { ...this.newMessage, date: newTimeFormat };

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

        receivedMessage = { ...this.newMessage, message: 'Ok', status: 'received' };

        this.contacts[activeContactIndex].messages.push(receivedMessage);

      }, 1000, activeContactIndex)
    }

  },
  created() {
    this.messageTimeWithoutSeconds();
    console.log(this.searchContact()[0].messages.length);
  }
}).mount('#app')