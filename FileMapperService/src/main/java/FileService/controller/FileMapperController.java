package FileService.controller;

import FileService.dto.RecordDTO;
import FileService.service.FileMapperService;
import com.sun.istack.internal.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class FileMapperController {
    @Autowired
    private final FileMapperService fileMapperService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/uploadFile")
    public @ResponseBody
    ResponseEntity<List<RecordDTO>> uploadFile(@RequestParam("file") @NotNull MultipartFile file) throws Exception {
        List<RecordDTO> records = fileMapperService.formatFile(file);
        if (records != null) {
            return new ResponseEntity<>(records, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
