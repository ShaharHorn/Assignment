package FileService.config;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@Configuration
@RequiredArgsConstructor
public class RowConfig {
    Map<String, Integer> rowConfig = new LinkedHashMap<>();

    //Could be read from a file.
    @Bean(value = "rowConfigMap")
    public Map<String, Integer> getRowConfig() {

        rowConfig.put("docType", 1);
        rowConfig.put("companyID", 9);
        rowConfig.put("date", 8);
        rowConfig.put("docID", 9);
        rowConfig.put("sign", 1);
        rowConfig.put("amount", 10);

        return rowConfig;
    }
}
