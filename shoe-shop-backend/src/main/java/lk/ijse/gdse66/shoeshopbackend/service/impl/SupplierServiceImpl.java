package lk.ijse.gdse66.shoeshopbackend.service.impl;


import lk.ijse.gdse66.shoeshopbackend.dto.CustomerDTO;
import lk.ijse.gdse66.shoeshopbackend.dto.SupplierDTO;
import lk.ijse.gdse66.shoeshopbackend.entity.Customer;
import lk.ijse.gdse66.shoeshopbackend.entity.Supplier;
import lk.ijse.gdse66.shoeshopbackend.repository.CustomerRepository;
import lk.ijse.gdse66.shoeshopbackend.repository.SupplierRepository;
import lk.ijse.gdse66.shoeshopbackend.service.SupplierService;
import lk.ijse.gdse66.shoeshopbackend.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.shoeshopbackend.service.exception.NotFoundException;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class SupplierServiceImpl implements SupplierService {
    @Autowired
    SupplierRepository supplierRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public void saveSupplier(SupplierDTO supplierDTO) {
        String supplierId = supplierDTO.getId();
        if (supplierId != null && supplierRepository.existsById(supplierId)) {
            throw new DuplicateRecordException("Supplier with ID " + supplierId + " already exists.");
        }
        Supplier supplier = modelMapper.map(supplierDTO, Supplier.class);
        supplierRepository.save(supplier);
    }

    @Override
    public void updateSupplier(SupplierDTO supplierDTO) {
        String supplierId = supplierDTO.getId();
        if (!supplierRepository.existsById(supplierId)) {
            throw new NotFoundException("Supplier with ID " + supplierId + " does not exist.");
        }

        Supplier supplier = modelMapper.map(supplierDTO, Supplier.class);
        supplierRepository.save(supplier);
    }

    @Override
    public void deleteSupplier(String id) {
        if (!supplierRepository.existsById(id)) {
            throw new NotFoundException("Supplier with ID " + id + " does not exist.");
        }

        supplierRepository.deleteById(id);
    }

    @Override
    public List<SupplierDTO> getAllSuppliers() {
        List<Supplier> all = supplierRepository.findAll();
        return modelMapper.map(all,new TypeToken<List<SupplierDTO>>(){}.getType());
    }

    @Override
    public String generateNextId() {
        Supplier lastSupplier = supplierRepository.findTopByOrderByIdDesc();

        System.out.println(lastSupplier);

        if (lastSupplier == null) {
            return "";
        }else{
            return lastSupplier.getId();
        }
    }

    @Override
    public List<SupplierDTO> searchBySupName(String name) {
        List<Supplier> supplierList = supplierRepository.findByNameStartingWith(name);
        return modelMapper.map(supplierList,new TypeToken<List<SupplierDTO>>(){}.getType());
    }
}
