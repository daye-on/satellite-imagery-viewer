package org.example.tanzaniaviewer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FileRangeDto {

    @Builder.Default
    private String bucket_name = "tz-bucket";

    @Builder.Default
    private String folder = "web_viewer_img";

    private String start_date;
    private String end_date;
    private String data_type;
}
