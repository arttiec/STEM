#include "Websocket.h"

Websocket::Websocket() {};

void Websocket::setId(String id)
{
  this->id = id;
}

String Websocket::getMsg() const{
  return this->msg;
}

String Websocket::getId() const{
  return this->id;
}

void Websocket::webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
  char message[length + 1];
  String connectedMsg = "{\"TypeOfMessage\": \"PrototypeInfo\", \"PrototypeId\":\"" + this->id + "\", \"Type\": \"Manipulator\"}";
  
  switch(type) {
    case WStype_DISCONNECTED:
      Serial.println("Desconectado do servidor WebSocket!");
      break;
    case WStype_CONNECTED:

      Serial.println("Conectado ao servidor WebSocket!");
      this->websocket.sendTXT(connectedMsg);
      break;
    case WStype_PING:
      this->websocket.sendPing(payload, length);
      break;
    case WStype_TEXT:
      memcpy(message, payload, length);
      message[length] = '\0';
      this->msg = String(message);  
      break;
  }
};

void Websocket::start(const char * address, const int port) {
  this->websocket.begin(address, port);
  
  this->websocket.onEvent([this](WStype_t type, uint8_t * payload, size_t length) {
    this->webSocketEvent(type, payload, length);
  });
};

void Websocket::loop() {
  this->websocket.loop();
};

Websocket::~Websocket() {};
