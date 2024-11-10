package pe.edu.utp.inti_sayri_backend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.utp.inti_sayri_backend.model.Chat;
import pe.edu.utp.inti_sayri_backend.model.Message;
import pe.edu.utp.inti_sayri_backend.model.User;
import pe.edu.utp.inti_sayri_backend.repository.ChatRepository;
import pe.edu.utp.inti_sayri_backend.repository.MessageRepository;
@Service
public class ChatService {
    
    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private UserService userService;
    
    @Autowired
    private MessageRepository messageRepository;

    public Map<String, Object> createChat(Chat chat) {
        Map<String, Object> response = new HashMap<>();
        try {
            Chat newChat = chatRepository.save(chat);
            completeResponse(response, "success", "Chat creado con éxito", newChat);
        } catch (IllegalArgumentException e) {
            incompleteResponse(response, "error", "Datos del chat no válidos: " + e.getMessage(), "bad_request");
        } catch (Exception e) {
            incompleteResponse(response, "error", "Error al crear el chat: " + e.getMessage());
        }
        return response;
    }

    public Map<String, Object> getAllChats() {
        Map<String, Object> response = new HashMap<>();
        try {
            List<Chat> chats = chatRepository.findAll();
            completeResponse(response, "success", "Lista de chats obtenida con éxito", chats);
        } catch (Exception e) {
            incompleteResponse(response, "error", "Error al obtener los chats: " + e.getMessage());
        }
        return response;
    }

    public Map<String, Object> getChatById(Long id) {
       Map<String, Object> response = new HashMap<>();
        try {
            Optional<Chat> chat = chatRepository.findById(id);
            if (chat.isPresent()) {
                completeResponse(response, "success", "Chat obtenido con éxito", chat.get());
            } else {
                incompleteResponse(response, "error", "Chat no encontrado", "not_found");
            }
        } catch (Exception e) {
            incompleteResponse(response, "error", "Error al obtener el chat: " + e.getMessage());
        }
        return response;
    }

    public Map<String, Object> addMessageToChat(Long chatId, Message message) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<Chat> chat = chatRepository.findById(chatId);

            Chat chatToUse = chat.orElse(new Chat());
            
            if (message != null) {
                message.setChat(chatToUse);
                chatToUse.getMensajes().add(message);
            }
            
            chatToUse = chatRepository.save(chatToUse);
            
            Message savedMessage = null;
            
            if (message != null) {
                savedMessage = messageRepository.save(message);
            }
            
            if (savedMessage == null) {
                incompleteResponse(response, "error", "Error mensaje nulo: ");
                return response;
            }
            
            completeResponse(response, "success", "Mensaje agregado al chat con éxito", savedMessage);

        } catch (Exception e) {
            incompleteResponse(response, "error", "Error al agregar el mensaje al chat: " + e.getMessage());
        }
        return response;
    }
    
    public Map<String, Object> addParticipantToChat(Long chatId, Long userId) {
        Map<String, Object> response = new HashMap<>();
        try {
            Chat chat = chatRepository.findById(chatId)
                    .orElseThrow(() -> new RuntimeException("Chat no encontrado"));
            User user = userService.findById(userId);

            chat.getParticipantes().add(user);
            user.getChats().add(chat);
            userService.updateUser(user);
            Chat updatedChat = chatRepository.save(chat);
            completeResponse(response, "success", "Participante agregado al chat con éxito", updatedChat);
        } catch (Exception e) {
            incompleteResponse(response, "error", "Error al agregar participante al chat: " + e.getMessage());
        }
        return response;
    }

    public Map<String, Object> getMessagesByChatId(Long chatId) {
        Map<String, Object> response = new HashMap<>();
        try {
            List<Message> messages = messageRepository.findByChatId(chatId);
            completeResponse(response, "success", "Mensajes obtenidos con éxito", messages);
        } catch (Exception e) {
            incompleteResponse(response, "error", "Error al obtener los mensajes: " + e.getMessage());
        }
        return response;
    }

    public Map<String, Object> deleteChat(Long chatId) {
        Map<String, Object> response = new HashMap<>();
        try {
            chatRepository.deleteById(chatId);
            completeResponse(response, "success", "Chat eliminado con éxito", null);
        } catch (Exception e) {
            incompleteResponse(response, "error", "Error al eliminar el chat: " + e.getMessage());
        }
        return response;
    }
    
    private void completeResponse(Map<String, Object> response, String status, String message, Object object) {
        response.put("status", status);
        response.put("message", message);
        if (object != null)
            response.put("data", object);
    }
    
    private void incompleteResponse(Map<String, Object> response, String status, String message, String errorType) {
        response.put("errorType", errorType);
        completeResponse(response, status, message, null);
    }
    
    private void incompleteResponse(Map<String, Object> response, String status, String message) {
        incompleteResponse(response, status, message, null);
    }
}
