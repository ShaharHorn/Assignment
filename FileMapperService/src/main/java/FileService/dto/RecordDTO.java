package FileService.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Data
@Getter
@Setter
public class RecordDTO {
    String docType;
    Integer companyID;
    Date date;
    Integer docID;
    String sign;
    Integer amount;
}
