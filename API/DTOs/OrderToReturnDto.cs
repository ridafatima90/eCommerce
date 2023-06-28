using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace API.DTOs
{
    public class OrderToReturnDto
    {
        public int Id { get; set; }
        public string BuyerEmail { get; set; }
        public DateTime OrderDate { get; set; }
        public Address ShipToAddress { get; set; }
        public string DeliveryMethod { get; set; }
        public decimal ShippingPrice { get; set; }
        public IReadOnlyList<OrderItemDto> OrderItems { get; set; }
        [Precision(18, 2)]
        public decimal Subtotal { get; set; }
        public decimal Total { get; set; }
        public OrderStatus Status { get; set; }
    }
}
