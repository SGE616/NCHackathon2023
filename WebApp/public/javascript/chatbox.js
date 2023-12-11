const chatBody = document.querySelector(".chat-body");
const txtInput = document.querySelector("#txtInput");
const send = document.querySelector(".send");

const url = "http://127.0.0.1:8765/chat"; 

send.addEventListener("click", () => {
    if(txtInput.value != ""){
        renderUserMessage();
    }
});

txtInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    if(txtInput.value != ""){
        renderUserMessage();
    }
  }
});

const renderUserMessage = () => {
  const userInput = txtInput.value;
  renderMessageEle(userInput, "user");
  txtInput.value = "";
  setTimeout(() => {
    renderChatbotResponse(userInput);
    setScrollPosition();
  }, 600);
};

const renderChatbotResponse = async(userInput) => {
  const res = await getChatbotResponse(userInput);
  renderMessageEle(res);
};

const renderMessageEle = (txt, type) => {
  let className = "user-message";
  if (type !== "user") {
    className = "chatbot-message";
  }
  const messageEle = document.createElement("div");
  const txtNode = document.createTextNode(txt);
  messageEle.classList.add(className);
  messageEle.append(txtNode);
  chatBody.append(messageEle);
};

const setScrollPosition = () => {
  if (chatBody.scrollHeight > 0) {
    chatBody.scrollTop = chatBody.scrollHeight;
  }
};

const openForm = () => {
    if (document.getElementById("chatbox").style.display == "block")
        document.getElementById("chatbox").style.display = "none";
    else if(document.getElementById("chatbox").style.display == "none"
    || document.getElementById("chatbox").style.display == "")
        document.getElementById("chatbox").style.display = "block"
};

const getChatbotResponse = async(userInput) => {

  const data = {
    chatQry: userInput
  };

  const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json", // content type
      },
  })

  const resp = await response.json();
  console.log(resp.reply);
  
  return resp.reply;
};

getChatbotResponse().catch((error) => {
  console.error("Error:", error);
});