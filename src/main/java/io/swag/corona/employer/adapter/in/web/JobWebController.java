package io.swag.corona.employer.adapter.in.web;

import io.swag.corona.employer.application.port.in.*;
import io.swag.corona.employer.domain.Job;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class JobWebController {

    private final CreateJobUseCase createJobUseCase;
    private final DeleteJobUseCase deleteJobUseCase;
    private final GetJobsUseCase getJobsUseCase;
    private final GetJobUseCase getJobUseCase;
    private final UpdateJobUseCase updateJobUseCase;

    @RequestMapping(path = "/job", method = RequestMethod.POST)
    Job create(
            @RequestParam("title") String title,
            @RequestParam("descr") String description,
            @RequestParam("location") String location,
            @RequestParam("qty") String qty,
            @RequestParam("salary") String salary
    ) {
        return createJobUseCase.create(
                title,
                description,
                location,
                Long.parseLong(qty),
                Long.parseLong(salary)
        );
    }

    @RequestMapping(path  = "/job", method = RequestMethod.GET)
    List<Job> findAll(){
        return getJobsUseCase.findAll();
    }

    @RequestMapping(path = "/job/{id}", method = RequestMethod.GET)
    Job findById(@PathVariable("id") String id) {
        return getJobUseCase.findById(id);
    }

    @RequestMapping(path = "/job/{id}", method = RequestMethod.PUT)
    Job update(
            @PathVariable("id") String id,
            @RequestParam("title") String title,
            @RequestParam("descr") String description,
            @RequestParam("location") String location,
            @RequestParam("qty") String qty,
            @RequestParam("salary") String salary
    ) {
        return updateJobUseCase.update(
                id,
                title,
                description,
                location,
                Long.parseLong(qty),
                Long.parseLong(salary)
        );
    }

    @RequestMapping(path = "/job/{id}", method = RequestMethod.DELETE)
    void delete(String jobId) {
        deleteJobUseCase.delete(jobId);
    }
}
