package FileService.service;

import FileService.dto.RecordDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class FileMapperService {
    ObjectMapper objectMapper = new ObjectMapper();

    @Qualifier("rowConfigMap")
    private final Map<String, Integer> rowConfig;

    private RecordDTO mapRow(String row) throws JsonProcessingException {
        JSONObject jsonObject = new JSONObject();
        RecordDTO recordDTO = null;
        for (Map.Entry<String, Integer> entity : rowConfig.entrySet()) {
            jsonObject.put(entity.getKey(), row.substring(0, entity.getValue()));
            row = row.substring(entity.getValue());
        }
        try {
            recordDTO = objectMapper.readValue(jsonObject.toString(), RecordDTO.class);
        } catch (JsonProcessingException e) {
            log.error(e.toString());
            throw e;
        }
        return recordDTO;
    }

    public List<RecordDTO> formatFile(MultipartFile file) throws Exception {
        List<RecordDTO> recordDTOList = new ArrayList<>();
        try {
            String[] rows = new String(file.getBytes(), StandardCharsets.UTF_8).split("\n");
            for (String row : rows) {
                recordDTOList.add(mapRow(row));
            }
        } catch (Exception e) {
            throw e;
        }
        return recordDTOList;
    }
}
