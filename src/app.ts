import _ from "lodash";
import Vue from "vue";

const app = new Vue({
  data: {
    message: "Hello Vue!",
  },
  el: "#app",
});

const vm = new Vue({
  computed: {
    reversedMessage(): string {
      return this.message
        .split("")
        .reverse()
        .join("");
    },
  },
  data: {
    message: "Hello",
  },
  el: "#example",
});

const computed = new Vue({
  computed: {
    fullName: {
      get(): string {
        return this.firstName + " " + this.lastName;
      },
      set(newValue: string) {
        const names = newValue.split(" ");
        this.firstName = names[0];
        this.lastName = names[1];
      },
    },
  },
  data: {
    firstName: "Foo",
    lastName: "Bar",
  },
  el: "#computed-example",
});

const watch = new Vue({
  data: {
    answer: "I cannot give you an answer until you ask a question!",
    question: "",
  },
  el: "#watch-example",
  methods: {
    getAnswer: _.debounce(() => {
      if (watch.question.indexOf("?") === -1) {
        watch.answer = "Questions usually contain a question mark, ;-)";
        return;
      }
      watch.answer = "Thinking...";
      fetch("https://yesno.wtf/api")
        .then((response) => response.json())
        .then((json) => watch.answer = _.capitalize(json.answer))
        .catch((err) => watch.answer = "Error! Could not reach the API." + err);
    }, 500),
  },
  watch: {
    question(newQuestion: string, oldQuestion: string) {
      this.answer = "Waiting for you to stop typing...";
      this.getAnswer();
    },
  },
});

declare global {
  interface Window {
    MyName: any;
  }
}

window.MyName = { app, vm, computed };
