#include "Websocket.h"

Websocket::Websocket() {};

String Websocket::getMsg() const{
  return this->msg;
}

void Websocket::webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
  char message[length + 1];
  
  switch(type) {
    case WStype_DISCONNECTED:
      Serial.println("Desconectado do servidor WebSocket!");
      break;
    case WStype_CONNECTED:
      Serial.println("Conectado ao servidor WebSocket!");
      this->websocket.sendTXT("{\"TypeOfMessage\": \"PrototypeInfo\", \"PrototypeId\": \"MP014\", \"Type\": \"Manipulator\"}");
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
