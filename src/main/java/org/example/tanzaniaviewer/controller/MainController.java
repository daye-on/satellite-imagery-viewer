package org.example.tanzaniaviewer.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.tanzaniaviewer.dto.FilePointDto;
import org.example.tanzaniaviewer.dto.FileRangeDto;
import org.example.tanzaniaviewer.dto.FileSelectDto;
import org.example.tanzaniaviewer.service.ApiService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Controller
@RequiredArgsConstructor
public class MainController {

    private final ApiService apiService;

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/page/{page}")
    public String page(@PathVariable("page") String page) {
        return page;
    }

    @ResponseBody
    @PostMapping("/api/range")
    public String getFileRange(@RequestBody FileRangeDto fileRangeDto){
        return apiService.getFileRangeList(fileRangeDto);
    }

    @ResponseBody
    @PostMapping("/api/select")
    public String getFileSelect(@RequestBody FileSelectDto fileSelectDto){
        return apiService.getFileSelectList(fileSelectDto);
    }

    @ResponseBody
    @PostMapping("/api/point")
    public String getPoint(@RequestBody FilePointDto filePointDto) {
        return apiService.getPointInObject(filePointDto);
    }
}