package org.example.tanzaniaviewer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FileSelectDto {

    @Builder.Default
    private String bucket_name = "tz-bucket";

    @Builder.Default
    private String folder = "web_viewer_img";

    private String select_date;

}
