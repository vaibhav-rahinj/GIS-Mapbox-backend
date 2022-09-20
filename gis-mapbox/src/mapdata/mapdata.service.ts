import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { CreateMapdatumDto } from './dto/create-mapdatum.dto';
import { UpdateMapdatumDto } from './dto/update-mapdatum.dto';
import { Mapdatum } from './entities/mapdatum.entity';

@Injectable()
export class MapdataService {
  // create(createMapdatumDto: CreateMapdatumDto) {
  //   return 'This action adds a new mapdatum';
  // }

  constructor(
    @InjectRepository(Mapdatum)
    private readonly PostgiRepository: Repository<Mapdatum>,
  ) {}
  create(CreatemapdatumDto: CreateMapdatumDto) {
    return this.PostgiRepository.save(CreatemapdatumDto);
  }

  findAll() {
    return this.PostgiRepository.find();
  }

  // findAll() {
  //   return `This action returns all mapdata`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} mapdatum`;
  // }

  // update(id: number, updateMapdatumDto: UpdateMapdatumDto) {
  //   return `This action updates a #${id} mapdatum`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} mapdatum`;
  // }
}
