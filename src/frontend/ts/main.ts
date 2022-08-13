
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
            let datosVisuale = `<ul class="collection">`
            for (let disp of resputa) {
                datosVisuale += `<li class="collection-item avatar">
                <i class="material-icons circle">folder</i>
                <span class="title nombreDisp">${disp.name}</span>
                <p> ${disp.description}</p>
                <a href="#!" class="secondary-content"> 
                <div class="switch">
                  <label>
                    Off
                    <input type="checkbox" id="cb_${disp.id}">
                    <span class="lever"></span>
                    On
                  </label>
                </div></a>
                </li>`;
            }
            datosVisuale += `</ul>`
            cajaDiv.innerHTML = datosVisuale;

            for (let disp of resputa) {
                let checkbox = document.getElementById("cb_"+ disp.id)
                checkbox.addEventListener("click", this)
            }

          } else {
              alert("Algo salio mal")
          }
    }

    public handlerResponseActualizar(status: number, response: string) {
        if (status == 200) {            
              console.log("post correcto")
          }
    }
    public handleEvent(e:Event): void {
        let objetoEvento = <HTMLInputElement>e.target;
        if (e.type == "click" && objetoEvento.id.startsWith("cb_")){
            console.log("se hizo click para prender o apagar")
            let datos = {"id":objetoEvento.id.substring(3), "state": objetoEvento.checked}
            this.framework.ejecutarRequest("POST", "http://localhost:8000/actualizar", this, datos);
        }else if (e.type == "click") {
            alert("Hola " +  this.listaPersonas[0].nombre +" "+objetoEvento.id);    
        } else {
            alert("se hizo doble click en el titulo")
        }
    }

}


window.addEventListener("load", ()=> {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, "");
    let btn = document.getElementById("btnSaludar");
    let btn2 = document.getElementById("btnDoble");
    let main: Main = new Main();
    main.nombre = "Matias"
 
    btn2.addEventListener("dblclick", main);
    btn.addEventListener("click", main);      
    
});








