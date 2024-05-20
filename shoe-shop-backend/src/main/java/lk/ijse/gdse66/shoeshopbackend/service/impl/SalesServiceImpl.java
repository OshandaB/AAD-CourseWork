package lk.ijse.gdse66.shoeshopbackend.service.impl;

import lk.ijse.gdse66.shoeshopbackend.dto.EmployeeDTO;
import lk.ijse.gdse66.shoeshopbackend.dto.SalesDTO;
import lk.ijse.gdse66.shoeshopbackend.entity.Sales;
import lk.ijse.gdse66.shoeshopbackend.repository.SalesRepository;
import lk.ijse.gdse66.shoeshopbackend.service.SalesService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class SalesServiceImpl implements SalesService {
    @Autowired
    SalesRepository salesRepository;
    @Autowired
    ModelMapper modelMapper;
    @Override
    public List<SalesDTO> filterByMonth(int month,int year) {
        List<Sales> byDate = salesRepository.findByMonthAndYear(month,year);
        return modelMapper.map(byDate,new TypeToken<List<SalesDTO>>(){}.getType());
    }
}
