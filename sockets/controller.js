const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
  socket.emit("ultimo-ticket", ticketControl.ultimo);

  socket.on("siguiente-ticket", (payload, callback) => {
    const siguiente = ticketControl.siguiente();
    callback(siguiente);

    //TODO: notificar que tem um novo ticket pendente
  });

  socket.on("atender-ticket", ({ escritorio }, callback) => {
    if (!escritorio) {
      return callback({
        ok: false,
        msg: "A mesa é obrigatória.",
      });
    }

    const ticket = ticketControl.atenderTicket(escritorio);

    // TODO: Notificar mudanças nos últimos 4 tickets
    if (!ticket) {
      callback({
        ok: false,
        msg: "Não tem tickets pendentes",
      });
    } else {
      callback({
        ok: true,
        ticket,
      });
    }
  });
};

module.exports = {
  socketController,
};
