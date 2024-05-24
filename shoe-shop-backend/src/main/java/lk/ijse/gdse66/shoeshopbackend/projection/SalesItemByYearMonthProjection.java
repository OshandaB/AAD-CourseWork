package lk.ijse.gdse66.shoeshopbackend.projection;

import java.util.Date;

public interface SalesItemByYearMonthProjection {
    String getSalesId();
    Date getSalesDate();
    String getItemName();
    String getItemCode();
    int getQty();
}
