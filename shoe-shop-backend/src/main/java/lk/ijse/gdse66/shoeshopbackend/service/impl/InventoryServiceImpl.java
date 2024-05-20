package lk.ijse.gdse66.shoeshopbackend.service.impl;

import lk.ijse.gdse66.shoeshopbackend.dto.CustomerDTO;
import lk.ijse.gdse66.shoeshopbackend.dto.InventoryDTO;
import lk.ijse.gdse66.shoeshopbackend.dto.ShoeSizeDTO;
import lk.ijse.gdse66.shoeshopbackend.dto.SupplierDTO;
import lk.ijse.gdse66.shoeshopbackend.entity.Customer;
import lk.ijse.gdse66.shoeshopbackend.entity.Inventory;
import lk.ijse.gdse66.shoeshopbackend.entity.ShoeSize;
import lk.ijse.gdse66.shoeshopbackend.entity.Supplier;
import lk.ijse.gdse66.shoeshopbackend.repository.CustomerRepository;
import lk.ijse.gdse66.shoeshopbackend.repository.InventoryRepository;
import lk.ijse.gdse66.shoeshopbackend.repository.ShoeSizeRepository;
import lk.ijse.gdse66.shoeshopbackend.service.InventoryService;
import lk.ijse.gdse66.shoeshopbackend.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.shoeshopbackend.service.exception.NotFoundException;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class InventoryServiceImpl implements InventoryService {
    @Autowired
    InventoryRepository inventoryRepository;
    @Autowired
    ShoeSizeRepository shoeSizeRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public void saveInventory(InventoryDTO inventoryDTO) {
        String itemCode = inventoryDTO.getItemCode();
        if (itemCode != null && inventoryRepository.existsById(itemCode)) {
            throw new DuplicateRecordException("Inventory with ID " + itemCode + " already exists.");
        }
        Inventory inventory = modelMapper.map(inventoryDTO, Inventory.class);
        Supplier supplier = new Supplier();
        supplier.setId(inventoryDTO.getSupplierCode());
        inventory.setSupplierCode(supplier);
        inventoryRepository.save(inventory);
        for (ShoeSizeDTO shoeSizeDTO : inventoryDTO.getShoeSizeDTOList()) {
            ShoeSize shoeSize = new ShoeSize();
            shoeSize.setSize(shoeSizeDTO.getSize());
            shoeSize.setQuantity(shoeSizeDTO.getQuantity());
            shoeSize.setStatus(shoeSizeDTO.getStatus());
            Inventory inventory1 = new Inventory();
            inventory1.setItemCode(shoeSizeDTO.getItemCode());
            shoeSize.setItemCode(inventory1);
            shoeSizeRepository.save(shoeSize);
        }


    }

    @Override
    public String generateNextShoeId(String name) {
        Inventory inventory = inventoryRepository.findTopByItemCodeStartingWithOrderByItemCodeDesc(name);

        System.out.println(inventory);

        if (inventory == null) {
            return "";
        } else {
            return inventory.getItemCode();
        }
    }

    @Override
    public List<InventoryDTO> gelAllProducts() {
        List<Inventory> all = inventoryRepository.findAll();
        modelMapper.getConfiguration().setAmbiguityIgnored(true);

        // Map Inventory to InventoryDTO
        return all.stream()
                .map(inventory -> {
                    InventoryDTO dto = modelMapper.map(inventory, InventoryDTO.class);
                    dto.setSupplierCode(inventory.getSupplierCode().getId());
                    dto.setShoeSizeDTOList(inventory.getShoeSizes().stream()
                            .map(shoeSize -> modelMapper.map(shoeSize, ShoeSizeDTO.class))
                            .collect(Collectors.toList()));
                    return dto;
                })
                .collect(Collectors.toList());
//        return modelMapper.map(all,new TypeToken<List<InventoryDTO>>(){}.getType());
    }

    @Override
    public void updateInventory(InventoryDTO inventoryDTO) {
//        String itemCode = inventoryDTO.getItemCode();
//        if (!inventoryRepository.existsById(itemCode)) {
//            throw new NotFoundException("Inventory with ID " + itemCode + " does not exist.");
//        }
//
//        Inventory inventory = modelMapper.map(inventoryDTO, Inventory.class);
//        Supplier supplier = new Supplier();
//        supplier.setId(inventoryDTO.getSupplierCode());
//        inventory.setSupplierCode(supplier);
//        inventoryRepository.save(inventory);
//
//
//        for (ShoeSizeDTO shoeSizeDTO : inventoryDTO.getShoeSizeDTOList()) {
////            ShoeSize shoeSize = new ShoeSize();
////            shoeSize.setSize(shoeSizeDTO.getSize());
////            shoeSize.setQuantity(shoeSizeDTO.getQuantity());
////            Inventory inventory1 = new Inventory();
////            inventory1.setItemCode(shoeSizeDTO.getItemCode());
////            shoeSize.setItemCode(inventory1);
//            shoeSizeRepository.updateDetailsByItemCode(inventoryDTO.getItemCode(), shoeSizeDTO.getQuantity(),shoeSizeDTO.getSize());
//        }
        String itemCode = inventoryDTO.getItemCode();
        if (!inventoryRepository.existsById(itemCode)) {
            throw new NotFoundException("Inventory with ID " + itemCode + " does not exist.");
        }

        // Retrieve the existing inventory entity
        Inventory inventory = inventoryRepository.findById(itemCode)
                .orElseThrow(() -> new NotFoundException("Inventory with ID " + itemCode + " does not exist."));

        // Update supplier code
//        Supplier supplier = new Supplier();
//        supplier.setId(inventoryDTO.getSupplierCode());
//        inventory.setSupplierCode(supplier);

        // Update shoe sizes
        List<ShoeSizeDTO> shoeSizeDTOList = inventoryDTO.getShoeSizeDTOList();
        for (ShoeSizeDTO shoeSizeDTO : shoeSizeDTOList) {
            if (shoeSizeDTO.getId() != 0) {
                Optional<ShoeSize> optionalShoeSize = inventory.getShoeSizes().stream()
                        .filter(shoeSize -> shoeSize.getId() == shoeSizeDTO.getId())
                        .findFirst();

                if (optionalShoeSize.isPresent()) {
                    ShoeSize shoeSize = optionalShoeSize.get();
                    shoeSize.setQuantity(shoeSizeDTO.getQuantity());
                    shoeSize.setSize(shoeSizeDTO.getSize());
                    shoeSize.setStatus(shoeSizeDTO.getStatus());
                    // Update shoe size in the repository
                    shoeSizeRepository.save(shoeSize);
                } else {

                    // Shoe size not found, you might want to handle this case based on your business logic
                }
            } else {
                ShoeSize newShoeSize = modelMapper.map(shoeSizeDTO, ShoeSize.class);
                Inventory inventory2 = new Inventory();
                inventory2.setItemCode(shoeSizeDTO.getItemCode());
                newShoeSize.setItemCode(inventory2);
                shoeSizeRepository.save(newShoeSize);
            }
        }
        Inventory inventory1 = modelMapper.map(inventoryDTO, Inventory.class);
        Supplier supplier = new Supplier();
        supplier.setId(inventoryDTO.getSupplierCode());
        inventory1.setSupplierCode(supplier);
        inventoryRepository.save(inventory1);
        // Save the updated inventory entity
//        inventoryRepository.save(inventory);
    }

    @Override
    public void deleteInventory(String id) {
        if (!inventoryRepository.existsById(id)) {
            throw new NotFoundException("Inventory with ID " + id + " does not exist.");
        }

        shoeSizeRepository.deleteByItemCode(id);
        inventoryRepository.deleteById(id);
    }

    @Override
    public List<InventoryDTO> searchByItemName(String name) {
        List<Inventory> all = inventoryRepository.findByItemDescStartingWith(name);
        modelMapper.getConfiguration().setAmbiguityIgnored(true);

        // Map Inventory to InventoryDTO
        return all.stream()
                .map(inventory -> {
                    InventoryDTO dto = modelMapper.map(inventory, InventoryDTO.class);
                    dto.setSupplierCode(inventory.getSupplierCode().getId());
                    dto.setShoeSizeDTOList(inventory.getShoeSizes().stream()
                            .map(shoeSize -> modelMapper.map(shoeSize, ShoeSizeDTO.class))
                            .collect(Collectors.toList()));
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<InventoryDTO> searchByCateFname(String cate) {
        List<Inventory> all = inventoryRepository.findByCategoryStartingWith(cate);
        // Map Inventory to InventoryDTO
        return all.stream()
                .map(inventory -> {
                    InventoryDTO dto = modelMapper.map(inventory, InventoryDTO.class);
                    dto.setSupplierCode(inventory.getSupplierCode().getId());
                    dto.setShoeSizeDTOList(inventory.getShoeSizes().stream()
                            .map(shoeSize -> modelMapper.map(shoeSize, ShoeSizeDTO.class))
                            .collect(Collectors.toList()));
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<InventoryDTO> searchByCateGenderName(String cate) {
        List<Inventory> all = inventoryRepository.findCategoriesNotEndingWithGender(cate);
        // Map Inventory to InventoryDTO
        return all.stream()
                .map(inventory -> {
                    InventoryDTO dto = modelMapper.map(inventory, InventoryDTO.class);
                    dto.setSupplierCode(inventory.getSupplierCode().getId());
                    dto.setShoeSizeDTOList(inventory.getShoeSizes().stream()
                            .map(shoeSize -> modelMapper.map(shoeSize, ShoeSizeDTO.class))
                            .collect(Collectors.toList()));
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<InventoryDTO> searchByCatePriceName(String price) {
        System.out.println(price);
        List<Inventory> all;
        switch (price) {
            case "0-1000":
                all = inventoryRepository.findItemsInPriceRange(0, 1000);
                break;
            case "1000-2000":
                all = inventoryRepository.findItemsInPriceRange(1000, 2000);
                break;
            case "2000-3000":
                all = inventoryRepository.findItemsInPriceRange(2000, 3000);
                break;
            case "Over 3000":
                all = inventoryRepository.findItemsInPriceRange(3000, Double.MAX_VALUE); // assuming Double.MAX_VALUE represents infinity
                break;
            default:
                all = inventoryRepository.findAll();
        }
        return all.stream()
                .map(inventory -> {
                    InventoryDTO dto = modelMapper.map(inventory, InventoryDTO.class);
                    dto.setSupplierCode(inventory.getSupplierCode().getId());
                    dto.setShoeSizeDTOList(inventory.getShoeSizes().stream()
                            .map(shoeSize -> modelMapper.map(shoeSize, ShoeSizeDTO.class))
                            .collect(Collectors.toList()));
                    return dto;
                })
                .collect(Collectors.toList());


    }

    @Override
    public InventoryDTO getOneProduct(String id) {
        Optional<Inventory> inventoryOptional = inventoryRepository.findById(id);
        if (inventoryOptional.isPresent()) {
            Inventory inventory = inventoryOptional.get();
            InventoryDTO inventoryDTO = modelMapper.map(inventory, InventoryDTO.class);

            inventoryDTO.setSupplierCode(inventory.getSupplierCode().getId());


            List<ShoeSizeDTO> shoeSizeDTOList = inventory.getShoeSizes().stream()
                    .map(shoeSize -> modelMapper.map(shoeSize, ShoeSizeDTO.class))
                    .collect(Collectors.toList());
            inventoryDTO.setShoeSizeDTOList(shoeSizeDTOList);

            return inventoryDTO;
        } else {
            return null;
        }
    }

    @Override
    public ShoeSizeDTO getQtyByItemCodeAndSize(String id, String size) {
       Inventory inventory = new Inventory();
       inventory.setItemCode(id);

        ShoeSize codeAndSize = shoeSizeRepository.findByItemCodeAndSize(inventory, size);
       return modelMapper.map(codeAndSize, ShoeSizeDTO.class);
    }
}
