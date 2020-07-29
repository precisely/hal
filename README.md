# dialog
Conversational client DSL. This library defines a DSL which allows defining interactions with a chatbot that guides a user to fill out forms. The DSL can be interpreted in an interactive mode (which is like a chat) or a set of editable forms. The core concept are "dialogs", data structures which define messages sent by a chatbot and forms which the user should fill out. Dialogs can invoke other dialogs and pass arguments to them. In the envisioned system, the server sends a dialog to the client, which interacts with the user, and sends partial or completed results back to the server.


