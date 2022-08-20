declare const M;
class Main implements EventListenerObject, ResponseLister {
    public listaPersonas: Array<Persona> = new Array();
    public etidadesAcciones: Array<Acciones> = new Array();
    public nombre: string;
    public framework: FrameWork = new FrameWork();
    constructor() {
        
        this.framework.ejecutarRequest("GET", "http://localhost:8000/devices", this)
 
        this.listaPersonas.push(new Usuario("Juan", 12, "jPerez"));
        this.listaPersonas.push(new Administrador("Pedro", 35));
        this.listaPersonas.push(new Persona("S", 12));
        this.etidadesAcciones.push(new Usuario("Juan", 12, "jPerez"));
        this.etidadesAcciones.push(new Administrador("Juan", 12));
        
    }

    public handlerResponse(status: number, response: string) {
        if (status == 200) {
            let resputaString: string = response;
            let resputa: Array<Device> = JSON.parse(resputaString);
            let cajaDiv = document.getElementById("caja");

            
            let datosVisuale:string = `<ul class="collection">`
            for (let disp of resputa) {
                datosVisuale += ` <li class="collection-item avatar">`;
                if (disp.type == 0) {
                    datosVisuale += `<img src="../static/images/lightbulb.png" alt="" class="circle">`;
                } else if (disp.type == 1) {
                    datosVisuale += `<img src="../static/images/window.png" alt="" class="circle">`;
                }
                
                datosVisuale += `
                <span class="title nombreDisp">${disp.name}</span>
                <p>${disp.description}</p>
                <div class="input-field col l1 m1 s1"></div>                

                <button id="btndel_${disp.id}" class="btn-floating waves-effect waves-light green"><i class="material-icons">delete</i></button>
                <div class="row">
                    <a href="#!" class="secondary-content">
                        <div class="switch" col l3 m3 s3>
                            <label>
                            Off
                            <input type="checkbox" id="cb_${disp.id}">
                            <span class="lever"></span>
                            On
                            </label>
                    </div>                                  
                    </a>
                </div>    
                    
              </li>`
            }
            datosVisuale += `</ul>`
            cajaDiv.innerHTML = datosVisuale;

            for (let disp of resputa) {
                let checkbox = <HTMLInputElement>document.getElementById("cb_" + disp.id);
                checkbox.checked = disp.state;           
                checkbox.addEventListener("click",this)
                let btn =  <HTMLElement>document.getElementById("btndel_" + disp.id);
                btn.addEventListener("click",this)
            }
        
          } else {
              alert("Algo salio mal")
          }
    }
    handlerResponseActualizar(status: number, response: string) {
        if (status == 200) {
            this.framework.ejecutarRequest("GET", "http://localhost:8000/devices", this) 
            alert("Se actualizo correctamente")               
        } else {
            alert(response)    
        }
        
    }

    public handleEvent(e:Event): void {
        let objetoEvento = <HTMLInputElement>e.target;
        let objetoBtn = <HTMLElement>e.target;

        if (e.type == "click" && objetoEvento.id.startsWith("cb_")) {
            console.log("Se hizo click para prender o apagar")
            let datos = { "id": objetoEvento.id.substring(3), "state": objetoEvento.checked };
            this.framework.ejecutarRequest("POST","http://localhost:8000/actualizar", this,datos)            
        }else if (e.type == "click" && objetoBtn.parentElement.id.startsWith("btndel_")) {
            let datos = {"id": objetoBtn.parentElement.id.substring(7)}
            this.framework.ejecutarRequest("POST","http://localhost:8000/removeDevice", this,datos)
        }else if (e.type == "click" && (objetoBtn.id == "saveNewDevice")) {                  
            let name = <HTMLInputElement>document.getElementById("inputNewNameDevice")
            let description = <HTMLInputElement>document.getElementById("inputNewDescription")
            let type = <HTMLInputElement>document.getElementById("selectedTypeNewDevice")
            let state = <HTMLInputElement>document.getElementById("checkboxNewDevice")
            console.log("saveNewDevice: " + name.value +" "+ description.value+ " "+ type.value + " " + state.checked )             
            let datos = {"name": name.value, "description": description.value, "type": type.value, "state": state.checked}
            if(datos.name != "" && datos.description != "" && datos.state != undefined && datos.type != ""){
                this.framework.ejecutarRequest("POST","http://localhost:8000/insertDevice", this,datos)
            }
        }else if (e.type == "click"){
            alert("Hola " +  this.listaPersonas[0].nombre +" ");    
        }else {
            alert("se hizo doble click en el titulo")
        }
    }
}

window.addEventListener("load", () => {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems,"");

    let btn = document.getElementById("btnSaludar");
    let btn2 = document.getElementById("btnDoble");
    let btnSaveNewDevice = document.getElementById("saveNewDevice");
    let modalNewDevice = document.getElementById("modalNewDevice");

    let main: Main = new Main();
    main.nombre = "Matias"

    btn2.addEventListener("dblclick", main);
    btn.addEventListener("click", main);
    btnSaveNewDevice.addEventListener("click", main);
});







