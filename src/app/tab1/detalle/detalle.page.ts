import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsumogitService } from 'src/app/service/consumogit.service';
import { Pastel } from 'src/app/service/Pastel';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  pasteles: Pastel[] = []
  dato:any
  pastel: Pastel[]=[]
  constructor(private router:ActivatedRoute,private serviceGit : ConsumogitService) {

    
   }

  ngOnInit() 
  {
    this.router.paramMap.subscribe(r=>{
      this.dato = r.get('id')
    })

    this.serviceGit.getPasteles().subscribe(r=>{
      this.pasteles = r
      this.pastel.push(this.pasteles[this.dato-1])
    })


  }

}
