import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Order } from "@shared/schema";

const AdminDashboard = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState("all");

  // Check if admin is logged in
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch("/api/admin/check", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Not authenticated");
        }
      } catch (error) {
        navigate("/admin");
      }
    };

    checkAdmin();
  }, [navigate]);

  // Fetch all orders
  const {
    data: orders,
    error,
    isLoading,
    refetch,
  } = useQuery<Order[]>({
    queryKey: ["/api/admin/orders"],
    retry: 3,
    refetchOnWindowFocus: true,
    refetchInterval: 10000, // Refresh data every 10 seconds
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => {
      return apiRequest("POST", "/api/admin/logout", {});
    },
    onSuccess: () => {
      toast({
        title: "Logout berhasil",
      });
      navigate("/admin");
    },
  });

  // Update order status mutation
  const updateOrderMutation = useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: string }) => {
      return apiRequest("PATCH", `/api/admin/orders/${orderId}`, { status });
    },
    onSuccess: () => {
      toast({
        title: "Status pesanan berhasil diperbarui",
      });
      refetch();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Gagal memperbarui status pesanan",
      });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const handleUpdateStatus = (orderId: string, status: string) => {
    updateOrderMutation.mutate({ orderId, status });
  };

  const handleViewOrderDetail = (orderId: string) => {
    navigate(`/admin/order/${orderId}`);
  };

  const formatDate = (dateString: string | Date) => {
    const date =
      typeof dateString === "string" ? new Date(dateString) : dateString;
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Filter orders based on current tab
  const filteredOrders = orders
    ? orders.filter((order) => {
        if (currentTab === "all") return true;
        return order.status === currentTab;
      })
    : [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Error loading orders. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Pesanan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{orders?.length || 0}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Pesanan Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-500">
                {orders?.filter((o) => o.status === "pending").length || 0}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Pesanan Diproses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-500">
                {orders?.filter((o) => o.status === "processing").length || 0}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Pesanan Selesai
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-500">
                {orders?.filter((o) => o.status === "completed").length || 0}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Pesanan</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="all"
              value={currentTab}
              onValueChange={setCurrentTab}
            >
              <TabsList className="mb-6">
                <TabsTrigger value="all">Semua</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="processing">Diproses</TabsTrigger>
                <TabsTrigger value="completed">Selesai</TabsTrigger>
              </TabsList>

              <TabsContent value={currentTab} className="mt-0">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 px-4 text-left">ID</th>
                        <th className="py-2 px-4 text-left">Produk</th>
                        <th className="py-2 px-4 text-left">ID Akun</th>
                        <th className="py-2 px-4 text-left">Tanggal</th>
                        <th className="py-2 px-4 text-left">Pembayaran</th>
                        <th className="py-2 px-4 text-left">Status</th>
                        <th className="py-2 px-4 text-left">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td
                            colSpan={7}
                            className="py-4 text-center text-gray-500"
                          >
                            Tidak ada pesanan
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((order) => (
                          <tr
                            key={order.id}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="py-3 px-4">{order.id}</td>
                            <td className="py-3 px-4">{order.productName}</td>
                            <td className="py-3 px-4">
                              {order.accountId}{" "}
                              {order.accountZone && `(${order.accountZone})`}
                            </td>
                            <td className="py-3 px-4">
                              {formatDate(order.createdAt)}
                            </td>
                            <td className="py-3 px-4">{order.paymentMethod}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full 
                                ${
                                  order.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : order.status === "waiting"
                                      ? "bg-orange-100 text-orange-800"
                                      : order.status === "processing"
                                        ? "bg-blue-100 text-blue-800"
                                        : order.status === "completed"
                                          ? "bg-green-100 text-green-800"
                                          : "bg-red-100 text-red-800"
                                }`}
                              >
                                {order.status === "pending"
                                  ? "Pending"
                                  : order.status === "waiting"
                                    ? "Menunggu"
                                    : order.status === "processing"
                                      ? "Diproses"
                                      : order.status === "completed"
                                        ? "Selesai"
                                        : "Dibatalkan"}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleViewOrderDetail(order.id)
                                  }
                                >
                                  Detail
                                </Button>
                                {order.status === "pending" && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handleUpdateStatus(
                                        order.id,
                                        "processing",
                                      )
                                    }
                                  >
                                    Proses
                                  </Button>
                                )}
                                {order.status === "processing" && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      handleUpdateStatus(order.id, "completed")
                                    }
                                  >
                                    Selesai
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
