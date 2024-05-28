#ifndef WEBSOCKET_H
#define WEBSOCKET_H

#include <WebSocketsClient.h>

class Websocket {
  private:
    WebSocketsClient websocket;
    void webSocketEvent(WStype_t type, uint8_t * payload, size_t length);
    
    String msg;
    
  public:
    Websocket();

    String getMsg() const;
    
    void start(const char * address, const int port);
    void loop();
    
    ~Websocket();
};

#endif
