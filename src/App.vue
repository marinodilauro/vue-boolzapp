<script>
export default {
  name: 'App',
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
          name: 'ChatBot',
          avatar: 'img/chatbot_avatar.avif',
          visible: true,
          messages: [],
        },
        {
          name: 'Michele',
          avatar: 'img/avatar_1.jpg',
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
          avatar: 'img/avatar_2.jpg',
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
          avatar: 'img/avatar_3.jpg',
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
          avatar: 'img/avatar_4.jpg',
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
          avatar: 'img/avatar_5.jpg',
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
          avatar: 'img/avatar_6.jpg',
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
          avatar: 'img/avatar_7.jpg',
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
          avatar: 'img/avatar_8.jpg',
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
     * @param {Array} contacts The list of contacts
     * @param {number} contactIndex The index of the user is chatting with (the active contact)
     * @param {Array} messagesList The list of messages of the active contact
     * @param {number} [messageIndex] The index of the message the function is working on
     * @param {string} messageDate The original 'date' property of hte message
     */
    messageTimeWithoutSeconds(contacts, contactIndex, messagesList, messageIndex, messageDate) {

      const messageHour = messageDate.split(' ').slice(1, 2)[0].split(':')[0];
      const messageMinute = messageDate.split(' ').slice(1, 2)[0].split(':')[1];

      const newTimeFormat = `${messageHour}:${messageMinute}`;

      return messageDate = newTimeFormat;

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

      if (this.searchBarInput.length === 0) {

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

      if (this.newMessage.message.length > 0) {

        this.contacts[activeContactIndex].messages.push(this.newMessage);

        const sentMessage = { ...this.newMessage };

        this.newMessage = { ...this.newMessage, message: '' };

        this.replyMessage(activeContactIndex, sentMessage.message)
      }

    },

    /** Function to receive a placeholder reply message
     * 
     * The function send a placeholder reply message in the chat of the contact the user is chatting with.
     * 
     * @param {number} activeContactIndex The index of the contact you are chatting with
     */
    async replyMessage(activeContactIndex, sentMessage) {

      try {
        // Attendiamo 1 secondo prima di fare la richiesta API
        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-3.5-turbo',
          temperature: 1.3,
          max_tokens: 100,
          messages: [
            {
              role: 'system',
              content: "Sei un chatbot per un progetto di chat di un'applicazione web. Il tuo compito principale è fornire un messaggio di risposta ai messaggi che ricevi come prompt. Ti verrà fornito il contenuto del messaggio e devi restituire una risposta e nient'altro."
            },
            {
              role: 'user',
              content: sentMessage
            }
          ]
        }, {
          headers: {
            'Authorization': 'Bearer ' + import.meta.env.VITE_APP_API_KEY,
            'Content-Type': 'application/json'
          }
        });

        console.log(response.data.choices[0]);
        console.log(sentMessage);

        const generatedText = response.data.choices[0].message.content;

        const receivedMessage = { ...this.newMessage, message: generatedText, status: 'received' };
        this.contacts[activeContactIndex].messages.push(receivedMessage);

      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
      }
    }
  }
}
</script>

<template>
  <div class="container mt-md-4 p-0 rounded-md">
    <div class="row h-100 g-0">

      <!-- Left side -->
      <div class="col-4 hide_sm h-100">
        <div class="left_side h-100 d-flex flex-column">

          <!-- Profile -->
          <div class="profile d-flex justify-content-between align-items-center">
            <div class="profile_pic d-flex">
              <img src="/public/img/avatar_io.jpg" alt="">
              <span>Sofia</span>
            </div>
            <ul class="icon_group hide_md d-flex align-items-center mx-3 mb-1 p-0">
              <li><a href="#"><i class="fa-solid fa-lg fa-circle-notch"></i></a></li>
              <li><a href="#"><i class="fa-solid fa-lg fa-message"></i></a></li>
              <li><a href="#"><i class="fa-solid fa-lg fa-ellipsis-vertical"></i></a></li>
            </ul>
          </div>

          <!-- Notifications -->
          <div class="notifications d-flex hide_md">
            <div class="notification_icon d-flex justify-content-center align-items-center">
              <i class="fa-solid fa-lg fa-bell-slash"></i>
            </div>
            <div class="toggle_notifications text_overflow">
              <div class="text_overflow">Ricevi notifiche di nuovi messaggi</div>
              <div><a href="#">Attiva notifiche desktop</a></div>
            </div>
          </div>

          <!-- Search bar -->
          <div class="search hide_md d-flex align-items-center px-4">
            <div class="search_bar rounded d-flex align-items-center">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input type="search" placeholder="Cerca o inizia una nuova chat" v-model="searchBarInput">
            </div>
          </div>

          <!-- Contacts -->
          <div class="contacts text_overflow flex-fill">

            <div class="contact d-flex" v-for="(contact, index) in searchContact()" @click="activeContact = index">
              <div class="profile_pic d-flex">
                <img :src="contact.avatar" alt="">
              </div>
              <div class="text_overflow hide_md d-flex flex-column justify-content-center">
                <div class="contact_name">{{ contact.name }}</div>
                <div class="last_message text_overflow" v-if="contact.messages.length > 0">
                  {{ contact.messages.at(-1).message }}</div>
                <div class="time" v-if="contact.messages.length > 0">
                  {{ contact.messages.at(-1).date.split(' ')[1].split(':').slice(0, 2).join(':') }}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


      <!-- Right side -->
      <div class="col-12 col-md-8 h-100">
        <div class="right_side h-100 d-flex flex-column">

          <!-- Active contact -->
          <div class="active_contact d-flex justify-content-between align-items-center">
            <div class="profile_pic d-flex align-items-center">
              <img :src="searchContact()[activeContact].avatar" alt="">
              <div class="text_overflow">
                <div class="contact_name">{{ searchContact()[activeContact].name }}</div>
                <div class="last_access text_overflow" v-if="searchContact()[activeContact].messages.length > 0">
                  Ultimo accesso il
                  {{ searchContact()[activeContact].messages.at(-1).date.split(' ')[0] }}
                  alle
                  {{ searchContact()[activeContact].messages.at(-1).date.split(' ')[1].split(':').slice(0,
                    2).join(':') }}
                </div>
              </div>
            </div>
            <ul class="icon_group hide_sm d-flex align-items-center m-0">
              <li><a href="#"><i class="fa-solid fa-lg fa-magnifying-glass"></i></a></li>
              <li><a href="#"><i class="fa-solid fa-lg fa-paperclip"></i></a></li>
              <li><a href="#"><i class="fa-solid fa-lg fa-ellipsis-vertical"></i></a></li>
            </ul>
          </div>

          <!-- Chat -->
          <div class="chat d-flex flex-column align-items-start">

            <div class=" d-flex flex-column justify-content-center align-items-end"
              v-for="(message, index) in searchContact()[activeContact].messages" :class="message.status">
              <div class="d-flex" v-if="searchContact()[activeContact].messages.length > 0">

                <!-- Message -->
                <div class="message ps-2 pt-2">
                  {{ message.message }} </div>

                <div class="dropdown">
                  <button class="btn backgroud-transparent" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false" data-bs-auto-close="outside">
                    <i class="msg_options_icon fa-solid fa-chevron-down"></i>
                  </button>


                  <ul class="dropdown-menu">

                    <li>
                      <ul class="d-flex justify-content-between p-1">
                        <li><a class="dropdown-item p-1" href="#">👍</a></li>
                        <li><a class="dropdown-item p-1" href="#">❤️</a></li>
                        <li><a class="dropdown-item p-1" href="#">😂</a></li>
                        <li><a class="dropdown-item p-1" href="#">😯</a></li>
                        <li><a class="dropdown-item p-1" href="#">😢</a></li>
                      </ul>

                    </li>

                    <li>
                      <hr class="dropdown-divider">
                    </li>

                    <li class="dropend">

                      <a class="dropdown-item backgroud-transparent text-start" data-bs-toggle="dropdown"
                        aria-expanded="false" href="#">
                        Messageinfo
                      </a>

                      <div class="dropdown-menu p-1 text-body-secondary">
                        <p style="font-size: 0.8rem" class="m-0">
                          Messaggio inviato il
                          {{ searchContact()[activeContact].messages.at(-1).date.split(' ')[0] }} alle
                          {{ messageTimeWithoutSeconds(searchContact(), activeContact,
                            searchContact()[activeContact].messages,
                            index, searchContact()[activeContact].messages[index].date) }}
                        </p>
                      </div>

                    </li>

                    <li>
                      <a class="dropdown-item" href="#" @click="deleteMessage(index, activeContact)">Delete
                        message</a>
                    </li>

                  </ul>

                </div>

              </div>


              <div class="time justify-content-center align-items-end">
                {{ messageTimeWithoutSeconds(searchContact(), activeContact, searchContact()[activeContact].messages,
                  index, searchContact()[activeContact].messages[index].date) }}
              </div>

            </div>
          </div>

          <!-- Input message -->
          <div class="input_message d-flex p-2">

            <a href="" class="d-flex justify-content-center align-items-center icon-link text-decoration-none">
              <i class="fa-regular fa-xl fa-face-smile"></i>
            </a>

            <input type="text" class="flex-grow-1 mx-2" placeholder="Scrivi un messaggio"
              v-model.trim="newMessage.message" @keydown.enter="addMessage(activeContact)">

            <a href="#" class="d-flex justify-content-center align-items-center icon-link hide_sm text-decoration-none">
              <i class="fa-solid fa-xl fa-microphone"></i>
            </a>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
