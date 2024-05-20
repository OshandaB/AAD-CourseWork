package lk.ijse.gdse66.shoeshopbackend.service;

import lk.ijse.gdse66.shoeshopbackend.dto.SalesDTO;

import java.util.Date;
import java.util.List;

public interface SalesService {

    List<SalesDTO> filterByMonth(int month,int year);
}
