i

RUN it: 

docker build --tag testelectronDocker:electron5 .
export IMAGE_ID=$(docker images | grep -Ei 'testelectronDocker' | awk '{print $3}')
echo $IMAGE_ID
docker run -itd -e ELECTRON_ENABLE_LOGGING=true --net=host --name clientreportsserver $IMAGE_ID

Attach into a shell: 


export CONTAINER_ID=value from above;

docker exec -it $CONTAINER_ID /bin/sh -c "[ -e /bin/bash ] && /bin/bash || /bin/sh"


/app# /app/node_modules/electron/dist/electron main.js

i
[5421:0724/193334.391955:FATAL:atom_main_delegate.cc(194)] Running as root without --no-sandbox is not supported. See https://crbug.com/638180.
Trace/breakpoint trap (core dumped)

C
root@vb:/app# /app/node_modules/electron/dist/electron --no-sandbox main.js 
electron.app isReady=false
[9217:0724/193430.126518:ERROR:bus.cc(396)] Failed to connect to the bus: Failed to connect to socket /var/run/dbus/system_bus_socket: No such file or directory
[9263:0724/193430.309563:ERROR:sandbox_linux.cc(364)] InitializeSandbox() called with multiple threads in process gpu-process.
electron.app isReady=true
[9217:0724/193430.554683:ERROR:bus.cc(396)] Failed to connect to the bus: Could not parse server address: Unknown address type (examples of valid types are "tcp" and on UNIX "unix")
[9287:0724/193430.767872:ERROR:command_buffer_proxy_impl.cc(124)] ContextResult::kTransientFailure: Failed to send GpuChannelMsg_CreateCommandBuffer.
[9217:0724/193431.380161:ERROR:bus.cc(396)] Failed to connect to the bus: Failed to connect to socket /var/run/dbus/system_bus_socket: No such file or directory
[9217:0724/193431.380208:WARNING:wifi_data_provider_linux.cc(185)] Failed to get the device list
[9217:0724/193431.383913:INFO:CONSOLE(170)] "%cElectron Security Warning (Insecure Content-Security-Policy)", source: /app/node_modules/electron/dist/resources/electron.asar/renderer/security-warnings.js (170)
did-finish-load ====
[9217:0724/193431.423952:WARNING:ipc_message_attachment_set.cc(49)] MessageAttachmentSet destroyed with unconsumed attachments: 0/1
Write PDF successfully.
