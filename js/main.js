
var dsnv = new DanhSachNhanVien();
var validation = new Validation();
getLocalStorage();

function getELE(id) {
    return document.getElementById(id);
}
getELE("btnThemNV").onclick = function themNhanVien() {
    
    // getELE("tknv").disabled = false;
    var tk = getELE("tknv").value;
    var ten = getELE("name").value;
    var Email = getELE("email").value;
    var Pass = getELE("password").value;
    var ngay = getELE("datepicker").value;
    var luongCB = getELE("luongCB").value;
    var chucVu = getELE("chucvu").value;
    var giolam = getELE("gioLam").value;


    var isValid = true;

    isValid &= validation.checkEmpty(tk, "tbTKNV", "Tài khoản nhân viên không được để trống") && validation.checkTK(tk, "tbTKNV", "Tài khoản không được trùng", dsnv.mangNV);

    isValid &= validation.checkEmpty(ten, "tbTen", "Tên nhân viên không được để trống") && validation.checkName(ten, "tbTen", "Tên nhân viên chỉ chứa ký tự chữ");

    isValid &= validation.checkEmpty(Email, "tbEmail", "Email nhân viên không được để trống") && validation.checkEmail(Email, "tbEmail", "Email phải đúng định dạng của Email");

    isValid &= validation.checkEmpty(Pass, "tbMatKhau", "Mật khẩu nhân viên không được để trống") && validation.checkPass(Pass, "tbMatKhau", "Mật khẩu phải chứa 6-10 kí tự, ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt");

    isValid &= validation.checkEmpty(ngay, "tbNgay", "Ngày làm nhân viên không được để trống") && validation.checkDay(ngay, "tbNgay", "Ngày làm chưa đúng định dạng ");

    isValid &= validation.checkEmpty(luongCB, "tbLuongCB", "Lương nhân viên không được để trống") && validation.checkLuong(luongCB, "tbLuongCB", "Lương cơ bản từ 1.000.000 đến 20.000.000");

    validation.checkSelect("chucvu", "tbChucVu", "Xin Chọn chức vụ");

    isValid &= validation.checkEmpty(giolam, "tbGiolam", "Giờ làm không được để trống") && validation.checkTime(giolam, "tbGiolam", "Giờ làm trong tháng  80 - 200 giờ");

    if (isValid) {
        var nv = new NhanVien(tk, ten, Email, Pass, ngay, Number(luongCB), chucVu, Number(giolam));
        nv.tongLuong();
        nv.xepLoai();
        dsnv.them(nv);
        dsnv.capNhat(nv);
        hienthiTable(dsnv.mangNV);
        setLocalStorage(dsnv.mangNV);
    }
}

function hienthiTable(mang) {
    var content = "";
    mang.map(function (nv) {
        var tr = `<tr>
        <td>${nv.tkhoanNV}</td>
        <td>${nv.tenNV}</td>
        <td>${nv.emailNV}</td>       
        <td>${nv.ngaysinh}</td>
        <td>${nv.chucvuNV}</td>
        <td>${nv.tongLuong}</td>
        <td>${nv.loai}</td>
        <td>
        <button class = 'btn btn-danger' onclick = "xoaNV('${nv.tkhoanNV}')">Xoá</button>
        <button class = 'btn btn-info'type = 'button' data-toggle ='modal'  data-target = #myModal onclick = "editNV('${nv.tkhoanNV}')">Xem</button>
        </td>
        </tr>`
        content += tr;
    });
    getELE("tableDanhSach").innerHTML = content;
}

function setLocalStorage(mang) {
    localStorage.setItem("DSNV", JSON.stringify(mang));
}

function getLocalStorage() {
    if (localStorage.getItem("DSNV") != null) {
        dsnv.mangNV = JSON.parse(localStorage.getItem("DSNV"));
        hienthiTable(dsnv.mangNV);
    }
}

function xoaNV(id) {
    dsnv.xoa(id);
    setLocalStorage(dsnv.mangNV);
    hienthiTable(dsnv.mangNV);
}


function editNV(id) {
    closeForm();
    var viTri = dsnv.timViTri(id);
    
    if (viTri != -1) {
        var nv = dsnv.mangNV[viTri];
        getELE("tknv").value = nv.tkhoanNV;
        getELE("tknv").disabled = true;

        getELE("name").value = nv.tenNV;
        getELE("email").value = nv.emailNV;
        getELE("password").value = nv.matkhauNV;
        getELE("datepicker").value = nv.ngaysinh;
        getELE("luongCB").value = nv.luongNV;
        getELE("chucvu").value = nv.chucvuNV;
        getELE("gioLam").value = nv.timeNV;
    } else {
        console.log("Không tìm thấy nhân viên cần xem");
    }
}
function capNhatNV() {
    
    var tk = getELE("tknv").value;
    var ten = getELE("name").value;
    var Email = getELE("email").value;
    var Pass = getELE("password").value;
    var ngay = getELE("datepicker").value;
    var luongCB = getELE("luongCB").value;
    var chucVu = getELE("chucvu").value;
    var giolam = getELE("gioLam").value;

    var isValid = true;

    // isValid &= validation.checkEmpty(tk, "tbTKNV", "Tài khoản nhân viên không được để trống") && validation.checkTK(tk, "tbTKNV", "Tài khoản không được trùng", dsnv.mangNV);

    isValid &= validation.checkEmpty(ten, "tbTen", "Tên nhân viên không được để trống") && validation.checkName(ten, "tbTen", "Tên nhân viên chỉ chứa ký tự chữ");

    isValid &= validation.checkEmpty(Email, "tbEmail", "Email nhân viên không được để trống") && validation.checkEmail(Email, "tbEmail", "Email phải đúng định dạng của Email");

    isValid &= validation.checkEmpty(Pass, "tbMatKhau", "Mật khẩu nhân viên không được để trống") && validation.checkPass(Pass, "tbMatKhau", "Mật khẩu phải chứa 6-10 kí tự, ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt");

    isValid &= validation.checkEmpty(ngay, "tbNgay", "Ngày làm nhân viên không được để trống") && validation.checkDay(ngay, "tbNgay", "Ngày làm chưa đúng định dạng ");

    isValid &= validation.checkEmpty(luongCB, "tbLuongCB", "Lương nhân viên không được để trống") && validation.checkLuong(luongCB, "tbLuongCB", "Lương cơ bản từ 1.000.000 đến 20.000.000");

    isValid &= validation.checkSelect("chucvu", "tbChucVu", "Xin Chọn chức vụ");

    isValid &= validation.checkEmpty(giolam, "tbGiolam", "Giờ làm không được để trống") && validation.checkTime(giolam, "tbGiolam", "Giờ làm trong tháng  80 - 200 giờ");

    if (isValid) {
        var nv = new NhanVien(tk, ten, Email, Pass, ngay, Number(luongCB), chucVu, Number(giolam));

        nv.tongLuong();
        nv.xepLoai();
        dsnv.capNhat(nv);
        hienthiTable(dsnv.mangNV);
        setLocalStorage(dsnv.mangNV);
    }
}

function resetForm() {
    // getELE("btnThemNV").style.display = "block";
    // getELE("btnCapNhat").style.display = "none";

    getELE("formQLNV").reset();
    getELE("tknv").disabled = false;
}
function searchLoai() {
    var keyword = getELE("searchName").value.trim();
    var mangTK = [];
    mangTK = dsnv.searchLoai(keyword);
    hienthiTable(mangTK);
}
getELE("btnTimNV").addEventListener("click", searchLoai);

getELE("searchName").addEventListener("keyup", searchLoai);

function closeForm() {
    getELE("tbTKNV").innerHTML = "";
    getELE("tbTen").innerHTML = "";
    getELE("tbEmail").innerHTML = "";
    getELE("tbMatKhau").innerHTML = "";
    getELE("tbNgay").innerHTML = "";
    getELE("tbLuongCB").innerHTML = "";
    getELE("tbChucVu").innerHTML = "";
    getELE("tbGiolam").innerHTML = "";
  }