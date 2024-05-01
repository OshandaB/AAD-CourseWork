package lk.ijse.gdse66.shoeshopbackend.service;

import lk.ijse.gdse66.shoeshopbackend.dto.SupplierDTO;

import java.util.List;

public interface SupplierService {
    void saveSupplier(SupplierDTO supplierDTO);

    void updateSupplier(SupplierDTO supplierDTO);

    void deleteSupplier(String id);

    List<SupplierDTO> getAllSuppliers();

    String generateNextId();

    List<SupplierDTO> searchBySupName(String name);
}
