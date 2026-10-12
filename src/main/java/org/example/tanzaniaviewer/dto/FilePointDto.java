package org.example.tanzaniaviewer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FilePointDto {

    @Builder.Default
    private String bucket_name = "tz-bucket";

    private String folder;
    private String img_name;
    private String lat;
    private String lon;
}
