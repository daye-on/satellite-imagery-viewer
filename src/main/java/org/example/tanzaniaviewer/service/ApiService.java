package org.example.tanzaniaviewer.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.example.tanzaniaviewer.dto.FileRangeDto;
import org.example.tanzaniaviewer.dto.FileSelectDto;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.beans.factory.annotation.Value;

@Slf4j
@Service
public class ApiService {

    private final RestClient restClient;

    public ApiService(RestClient.Builder build, @Value("${api.url}") String baseUrl) {
        this.restClient = build
                .baseUrl(baseUrl)
                .requestInitializer(request -> request.getHeaders().add(HttpHeaders.CONTENT_TYPE, "application/json"))
                .build();
    }

    public String getFileRangeList(FileRangeDto fileRangeDto){
        try{
            String reqParam = new ObjectMapper().writeValueAsString(fileRangeDto);
            return restClient.post()
                    .uri("list")
                    .body(reqParam)
                    .retrieve()
                    .body(String.class);
        } catch (Exception e){
            log.error("[ApiService, range] Error: {}", e.getMessage());
            return null;
        }
    }

    public String getFileSelectList(FileSelectDto fileSelectDto){
        try{
            String reqParam = new ObjectMapper().writeValueAsString(fileSelectDto);
            return restClient.post()
                    .uri("same")
                    .body(reqParam)
                    .retrieve()
                    .body(String.class);
        } catch (Exception e){
            log.error("[ApiService, select] Error: {}", e.getMessage());
            return null;
        }
    }
}
