import { Module } from '@nestjs/common';
import { MapdataService } from './mapdata.service';
import { MapdataController } from './mapdata.controller';
import { Mapdatum } from './entities/mapdatum.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

@Module({
  imports: [TypeOrmModule.forFeature([Mapdatum])],
  controllers: [MapdataController],
  providers: [MapdataService],
})
export class MapdataModule {}
